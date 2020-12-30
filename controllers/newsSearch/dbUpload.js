const { news } = require('../../models');
const { category : categories } = require('../../models');
const { scrap } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;


module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];

        try {
            const {title, url, imageURL, description, datePublished, provider, category} = req.body;
            const userdata = jwt.verify(token, ACCESS_SECRET);
            const newsdata = (await news.findOrCreate({where: {title, url, imageURL, description, datePublished, provider},
                defaults: {title, url, imageURL, description, datePublished, provider}}))[0].dataValues;
            const categorydata = (await categories.findOne({where: {category}})).dataValues;
            const scrapdata = (await scrap.findOrCreate({where: {userId: userdata.id, newsId: newsdata.id, categoryId: categorydata.id},
            defaults: {userId: userdata.id, newsId: newsdata.id, categoryId: categorydata.id}}))[0].dataValues;
            
            res.send({data: {id: scrapdata.id}, message: "scrap success"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}