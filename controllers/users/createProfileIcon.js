const { user } = require('../../models');

module.exports = async (req, res) => {
    res.status(200).send({ data: null, message: 'ok' });
}