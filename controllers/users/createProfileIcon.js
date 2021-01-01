const { user } = require('../../models');
const url = process.env.URL;
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const axios = require('axios');
const fs = require('fs');

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
                data = cleanJWT(jwt.verify(token, ACCESS_SECRET));
            }
            const userInfo = await user.findOne({ where: { email: data.email } });
            let oldIcon;
            if (userInfo.dataValues.profileIconURL) oldIcon = userInfo.dataValues.profileIconURL.split('/icon/')[1];
            try {
                fs.unlinkSync('./uploads/' + oldIcon);
            } catch (err) {
                console.error(err)
            }
            await user.update({ profileIconURL: url + '/user/icon/' + req.file.filename }, { where: { email: data.email } });
            res.status(200)
                .send({ data: req.file, message: 'profile icon updated' })
        } catch (err) {
            res.status(400).send({ data: null, message: 'invalid access token' });
        }
    }
}