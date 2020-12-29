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
            await user.update({accessToken: null, refreshToken: null}, { where: { email: data.email } });
            res.status(200)
            .cookie('refreshToken', null, { httpOnly: true, sameSite: 'none' })
            .send({data: null, message: 'logout success'})
        } catch (err) {
            res.status(400).send({data: err, message: 'invalid access token'});
        }

    }
}