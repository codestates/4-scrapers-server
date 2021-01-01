const { category : categories } = require('../../models');
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
            const { id, category } = req.body;
            if (isGoogle) {
                await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token, null);
            } else {
                jwt.verify(token, ACCESS_SECRET);
            }
            const categorydata = (await categories.findOne({where: {category}})).dataValues;
            await scrap.update({categoryId: categorydata.id}, {where: {id}})

            res.send({data: null, message: "category edited"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}