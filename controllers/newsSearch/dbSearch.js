const { scrap } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { news } = require('../../models');
const { category } = require('../../models');

module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];

        try {
            const { q, pages } = req.body;
            const offset = 20 * (pages-1);
            const userdata = jwt.verify(token, ACCESS_SECRET);
            
            const scraps = await scrap.findAll({offset, limit:20, where: {userId: userdata.id}, 
                include: [{model: news, category, where: {title: {
                    [Op.like]: '%' + q + '%'
                }}}, {model: category}] });

            const refinedScraps = [];
            for (let scrap of scraps) {
                refinedScraps.push({
                    id: scrap.id,
                    title: scrap.news.title,
                    url: scrap.news.url,
                    imageURL: scrap.news.imageURL,
                    description: scrap.news.description,
                    datePublished: scrap.news.datePublished,
                    provider: scrap.news.provider,
                    category: scrap.category.category
                })
            }

            res.send({data: refinedScraps, message: "scrap search success"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}