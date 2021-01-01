const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
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
                data = (jwt.verify(token, ACCESS_SECRET));
            }
            const userInfo = (await user.findOne({ where: { email: data.email } })).dataValues;
            const sendObj = {
                email: userInfo.email,
                name: userInfo.name,
                profileIconURL: userInfo.profileIconURL
            }
            res.status(200)
                .send({ data: sendObj, message: 'userInfo get successful' })
        } catch (err) {
            res.status(400).send({ data: null, message: 'invalid access token' });
        }
    }
}