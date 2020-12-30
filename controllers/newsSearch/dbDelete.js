const { scrap } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;


module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];

        try {
            const { id } = req.body;
            jwt.verify(token, ACCESS_SECRET);
            await scrap.destroy({where: {id}})
            
            res.send({data: null, message: "scrap deleted"});
            
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }
    }
}