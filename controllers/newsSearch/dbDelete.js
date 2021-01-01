const { scrap } = require('../../models');
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
            const { id } = req.body;
            if (isGoogle) {
                await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token, null);
            } else {
                jwt.verify(token, ACCESS_SECRET);
            }
            await scrap.destroy({ where: { id } })

            res.send({ data: null, message: "scrap deleted" });

        } catch (err) {
            res.status(400).send({ data: err, message: 'invalid access token' });
        }
    }
}