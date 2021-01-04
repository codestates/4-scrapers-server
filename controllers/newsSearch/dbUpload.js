const { news } = require('../../models');
const { category : categories } = require('../../models');
const { scrap } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { user } = require('../../models');
const ACCESS_SECRET = process.env.ACCESS_SECRET;


module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        let isGoogle = false;
        if (token[4] === '.') isGoogle = true;

        try {
            const {title, url, imageURL, description, datePublished, provider, category} = req.body;
            let userdata;
            if (isGoogle) {
                userdata = (await axios.post("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token, null)).data;
                userdata.id = (await user.findOne({where: {email: userdata.email}})).dataValues.id;
            } else {
                userdata = (jwt.verify(token, ACCESS_SECRET));
            }
            const newsdata = (await news.findOrCreate({where: {title, url, imageURL, description, datePublished, provider},
                defaults: {title, url, imageURL, description, datePublished, provider}}))[0].dataValues;
            const categorydata = (await categories.findOne({where: {id: category}})).dataValues;
            const scrapdata = (await scrap.findOrCreate({where: {userId: userdata.id, newsId: newsdata.id, categoryId: categorydata.id},
            defaults: {userId: userdata.id, newsId: newsdata.id, categoryId: categorydata.id}}))[0].dataValues;
            
            res.send({data: {id: scrapdata.id}, message: "scrap success"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}