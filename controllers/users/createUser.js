const { user } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10; // * 암호화된 문구길이

module.exports = async (req, res) => {
    try {
        const userInfo = await user.findOne({ where: {email: req.body.email}})

        if(userInfo) {
            res.status(400).send({data: null, message: 'exist Email'})
        }

        const hash = await bcrypt.hash(req.body.password, saltRounds);

        await user.create({
            email: req.body.email,
            password: hash
        });
        res.status(200).send({data: null, message: 'complete User'})
    }
    catch(err) {
        console.log(err)
    }
}
