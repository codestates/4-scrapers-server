const { user } = require('../../models');
const qs = require('qs');
const axios = require('axios');

module.exports = async (req, res) => {
    const TOKEN_URI = "https://oauth2.googleapis.com/token";
    const queryStr = qs.stringify({
        code: req.body.authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code"
    });

    const url = TOKEN_URI + "?" + queryStr;
    try {
        const tokens = (await axios.post(url, null)).data;
        const userdata = (await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + tokens.access_token, null)).data;

        let userInfo = await user.findOne({ where: { email: userdata.email } })
        if (userInfo) {
            await user.update({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token }, { where: { email: userdata.email } })
        } else {
            userInfo = (await user.create({
                email: userdata.email,
                name: userdata.email.split('@')[0],
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            }))
        }

        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, sameSite: 'none' })
            .send({
                data: {
                    id: userInfo.dataValues.id,
                    email: userInfo.dataValues.email,
                },
                accessToken: tokens.access_token,
                message: 'login ok'
            });

    } catch (err) {
        res.status(400).send({
            data: err,
            message: "invalid authorization code"
        })
    }


};