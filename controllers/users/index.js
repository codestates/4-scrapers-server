const accessTokenRequest = require('./tokenRequest');

module.exports = {
    deleteUser: require('./deleteUser'),
    patchUser: require('./patchUser'),
    createProfileIcon: require('./createProfileIcon'),
    getUserProfile: require('./getUserProfile'),
    createUser: require('./createUser'),
    login: require('./login'),
    logout: require('./logout'),
    tokenRequest: require('./tokenRequest')
  };