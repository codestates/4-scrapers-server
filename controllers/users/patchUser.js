const { user } = require('../../models');

module.exports = async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.name) {
        await user.update({password: req.body.password, name: req.body.name}, { where: { email: 'test' } });
        res.status(200).send({ data: null, message: 'ok' });
    } else if (req.body.password) {
        await user.update({password: req.body.password}, { where: { email: 'test' } });
        res.status(200).send({ data: null, message: 'ok' });
    } else if (req.body.name) {
        await user.update({name: req.body.name}, { where: { email: 'test' } });
        res.status(200).send({ data: null, message: 'ok' });
    } else {
        res.status(400).send({ data: null, message: 'empty request' });
    }
}