const axios = require('axios')
const {generateAPIKey} = require('./utils/generateAPIKey.js')
const {encryptKey} = require('./utils/encryptKey.js')

const createMoat = async (_registry, _moat, _signature, _walletAddr) => {

    const apiKey = generateAPIKey()
    const secret = generateAPIKey()
    const encryptedKey = await encryptKey(_signature, _walletAddr, apiKey)
    const encryptedSecret = await encryptKey(_signature, _walletAddr, secret)

    const params = {
        url: _registry+'/createMoat',
        method: 'post',
        timeout: 20000,
        data: {
            encryptedKey: encryptedKey,
            key: apiKey,
            moat: _moat,
            address: _walletAddr,
            secret: encryptedSecret
        }
    };
    let response = await axios(params)
    response.data.apiKey = apiKey
    response.data.secret = secret
    return response.data
}

module.exports = createMoat