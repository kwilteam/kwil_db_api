const axios = require('axios')

const createMoat = async (_registry, _moat, _user, _password, _walletAddr = '') => {
    const params = {
        url: _registry+'/createMoat',
        method: 'post',
        timeout: 20000,
        data: {
            user: _user,
            password: _password,
            moat: _moat,
            address: _walletAddr
        }
    };
    const response = await axios(params)
    return response.data
}

module.exports = createMoat