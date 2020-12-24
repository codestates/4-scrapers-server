const { user } = require('../../models');

module.exports = async (req, res) => {
    await user.destroy({ where: { email: 'test' } });
    res.status(200).send({ data: null, message: 'ok' });
}