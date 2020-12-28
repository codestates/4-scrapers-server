const { user } = require('../../models');
const jwt = require('jsonwebtoken')
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

module.exports = async (req, res) => {
    let userInfo = await user.findOne({
        where: { email: req.body.email, password: req.body.password }
    })

    if (!userInfo) {
        res.status(400).send({
            data: null,
            messae: "not authorized"
        })
    } else {
        const accessToken = jwt.sign({
            id: userInfo.dataValues.id,
            email: userInfo.dataValues.email
        }, ACCESS_SECRET, {
            expiresIn: "1 seconds"
        })
        const refreshToken = jwt.sign({
            id: userInfo.dataValues.id,
            email: userInfo.dataValues.email
        }, REFRESH_SECRET, {
            expiresIn: "1 seconds"
        })
        await user.update({refreshToken}, { where: { email: req.body.email } });
        res.status(201)
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none' })
            .send({
                data: {id: userInfo.dataValues.id, email: userInfo.dataValues.email},
                accessToken,
                message: 'login ok'
            })
    }
}