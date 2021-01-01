const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res) => {
    const { name, password } = req.body;

    // accessToken 유효성 검사
    if (!req.headers.authorization) {
        res.status(400).send({ data: null, message: 'invalid access Token' })
    }
    else {
        const token = req.headers.authorization.split(' ')[1];
        let isGoogle = false;
        if (token[4] === '.') isGoogle = true;

        try {
            let verifyToken;
            if (isGoogle) {
                verifyToken = (await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token, null)).data;
            } else {
                verifyToken = cleanJWT(jwt.verify(token, ACCESS_SECRET));
            }

            if (name && password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);

                await user.update({ name, password: hash }, { where: { email: verifyToken.email } })
                res.status(200).send({ data: null, message: 'nickName And password Update.' })
            }
            else if (name) {
                await user.update({ name }, { where: { email: verifyToken.email } })
                res.status(200).send({ data: null, message: 'nickName Update.' })
            }
            else if (password) {
                const hash = await bcrypt.hash(req.body.password, saltRounds);

                await user.update({ password: hash }, { where: { email: verifyToken.email } })
                res.status(200).send({ data: null, message: 'password Update.' })
            }
            else {
                res.status(400).send({ data: null, message: 'empty Request. Please fill in the blanks.' })
            }
        }
        catch {
            res.status(400).send({ data: null, message: 'invalid access Token' })
        }
    }

}
