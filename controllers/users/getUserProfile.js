const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = async (req, res) => {
    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });
    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];        

        try {
            const data = jwt.verify(token, ACCESS_SECRET);
            const userInfo = (await user.findOne({where: {email:data.email}})).dataValues;
            const sendObj = {
                email: userInfo.email,
                name: userInfo.name,
                profileIconURL: userInfo.profileIconURL
            }
            res.status(200)
            .send({data: sendObj, message: 'userInfo get successful'})
        } catch (err) {
            res.status(400).send({data: null, message: 'invalid access token'});
        }
    }
}