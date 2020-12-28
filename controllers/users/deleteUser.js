const { user } = require('../../models');

module.exports = async (req, res) => {
    await user.destroy({ where: { email: req.body.email } });
    console.log("deleteUser Complete")
    res.status(200).send({ data: null, message: 'deleteUser complete' });
}