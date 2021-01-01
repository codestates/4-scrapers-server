const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('qs');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

module.exports = async (req, res) => {
  function cleanJWT(token) {
    if (typeof token === 'string') {
      return token;
    }
    const cleanToken = { ...token };
    delete cleanToken.iss;
    delete cleanToken.sub;
    delete cleanToken.aud;
    delete cleanToken.exp;
    delete cleanToken.nbf;
    delete cleanToken.iat;
    delete cleanToken.jti;
    return cleanToken;
  }
  if (!req.headers.authorization) res.status(400).send({ data: null, message: 'access token not found' });
  else {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    let isGoogle = false;
    if (token[4] === '.') isGoogle = true;
    try {
      let data;
      if (isGoogle) {
        data = (await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token, null)).data;
      } else {
        data = cleanJWT(jwt.verify(token, ACCESS_SECRET));
      }

      const userInfo = await user.findOne({ where: { email: data.email } })
      if (token === userInfo.dataValues.accessToken) {
        res.status(200).send({
          data,
          accessToken: token,
          message: 'access token verify ok'
        });
      } else {
        res.status(400).send({
          data: null,
          message: 'invalid access token'
        })
      }
    } catch (err) {
      if (isGoogle) {
        if (!req.cookies.refreshToken) {
          res.status(400).send({ data: null, message: 'refresh token not provided' });
        } else {
          try {
            const queryStr = qs.stringify({
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: req.cookies.refreshToken,
              grant_type: "refresh_token"
            })
            const accessToken = (await axios.post('https://oauth2.googleapis.com/token?' + queryStr, null)).data.access_token;
            const data = (await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + accessToken, null)).data;
            res.status(200).send({
              data,
              accessToken,
              message: 'accessToken re-issued'
            })
          } catch (err) {
            res.status(400)
              .cookie('refreshToken', null, { httpOnly: true, sameSite: 'none' })
              .send({ data: null, message: "refresh token expired. please login again" })
          }
        }
      } else if (err.name === 'TokenExpiredError') {
        const data = cleanJWT(jwt.decode(token, ACCESS_SECRET));
        const userInfo = await user.findOne({ where: { email: data.email } })
        if (token !== userInfo.dataValues.accessToken) {
          res.status(400).send({
            data: null,
            message: 'invalid access token'
          });
        } else if (!req.cookies.refreshToken) {
          res.status(400).send({ data: null, message: 'refresh token not provided' });
        } else if (req.cookies.refreshToken !== userInfo.dataValues.refreshToken) {
          res.status(400).send({ data: null, message: "invalid refresh token" })
        } else {
          try {
            jwt.verify(req.cookies.refreshToken, REFRESH_SECRET);
            const accessToken = jwt.sign({
              id: data.id,
              email: data.email
            }, ACCESS_SECRET, {
              expiresIn: '1 hours'
            })
            await user.update({ accessToken }, { where: { email: data.email } })
            res.status(200).send({
              data,
              accessToken,
              message: 'accessToken re-issued'
            })
          } catch (err) {
            await user.update({ refreshToken: null }, { where: { email: data.email } })
            res.status(400)
              .cookie('refreshToken', null, { httpOnly: true, sameSite: 'none' })
              .send({ data: null, message: "refresh token expired. please login again" })
          }
        }
      }
      else res.status(400).send({ data: err, message: 'invalid access token' });
    }
  }
};
