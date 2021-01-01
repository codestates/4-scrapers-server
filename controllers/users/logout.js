const { user } = require('../../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
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
                await axios.post("https://oauth2.googleapis.com/revoke?token=" + token, null);
            } else {
                data = cleanJWT(jwt.verify(token, ACCESS_SECRET));
            }
            await user.update({ accessToken: null, refreshToken: null }, { where: { email: data.email } });
            res.status(200)
                .cookie('refreshToken', null, { httpOnly: true, sameSite: 'none' })
                .send({ data: null, message: 'logout success' })
        } catch (err) {
            res.status(400).send({ data: err, message: 'invalid access token' });
        }

    }
}