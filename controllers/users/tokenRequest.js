const { user } = require('../../models');
const jwt = require('jsonwebtoken');
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
  if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
  else {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    try {
      const data = cleanJWT(jwt.verify(token, ACCESS_SECRET));
      res.status(201).send({
        data,
        accessToken: token,
        message: 'access token verify ok'
      });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
          const data = cleanJWT(jwt.decode(token, ACCESS_SECRET));
          const userInfo = await user.findOne({where: {email: data.email}})
          if (!req.cookies.refreshToken) {
              res.status(400).send({data: null, message: 'refresh token not provided'});
          } else if (req.cookies.refreshToken !== userInfo.dataValues.refreshToken) {
              res.status(400).send({data: null, message: "invalid refresh token"})
          } else {
              try {
                jwt.verify(req.cookies.refreshToken, REFRESH_SECRET);
                const accessToken = jwt.sign({
                    id: data.id,
                    email: data.email
                }, ACCESS_SECRET, {
                    expiresIn: '1 hours'
                })
                res.status(201).send({
                  data,
                  accessToken,
                  message: 'accessToken re-issued'
                })
              } catch (err) {
                await user.update({refreshToken: null}, {where: {email: data.email}})
                res.status(400).send({data:null, message: "refresh token expired. please login again"})
              }
          }
      }
      else res.status(400).send({ data: err, message: 'invalid access token' });
    }
  }
};
