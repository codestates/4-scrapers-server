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
            const { id, category } = req.body;
            jwt.verify(token, ACCESS_SECRET);
            const categorydata = (await categories.findOne({where: {category}})).dataValues;
            await scrap.update({categoryId: categorydata.id}, {where: {id}})

            res.send({data: null, message: "category edited"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}