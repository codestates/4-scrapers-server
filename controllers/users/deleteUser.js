const { user } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    // 비밀번호를 검증
    const password = await bcrypt.compare(req.body.password, (await user.findOne({ where: {email: req.body.email}})).dataValues.password);
    
    if(password) {
        await user.destroy({where: {email: req.body.email}});
        res.status(200).send({ data: null, message: 'deleteUser complete'})
    }
    else {
        res.status(400).send({ data: null, message: 'unComplete deleteUser'})
    }
    
}
