const { user } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    if (!req.headers.authorization) res.status(400).send({ data: null, message: 'invalid access token' });

    else {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        try {
            const data = jwt.verify(token, ACCESS_SECRET);
            let password;

            // 비밀번호 검증
            try {
                password = await bcrypt.compare(req.body.password, (await user.findOne({ where: { email: data.email } })).dataValues.password)
            } catch {
                password = null;
            }


            if (password) {
                await user.destroy({ where: { email: req.body.email } });
                res.status(200).send({ data: null, message: 'deleteUser complete' })
            }
            else {
                res.status(400).send({ data: null, message: 'unComplete deleteUser' })
            }
        } catch (err) {
            res.status(400).send({ data: err, message: 'invalid access token' });
        }
    }

}

