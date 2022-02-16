const axios = require('axios')
const {generateAPIKey} = require('./utils/generateAPIKey.js')
const {encryptKey} = require('./utils/encryptKey.js')
const {generateKeyPair} = require('./utils/generateKeyPair.js')

const createMoat = async (_registry, _moat, _signature, _walletAddr) => {

    const keys = await generateKeyPair()
    const privateKey = keys.privateKey
    const secret = generateAPIKey()
    const encryptedKey = await encryptKey(_signature, _walletAddr, JSON.stringify(privateKey))
    const encryptedSecret = await encryptKey(_signature, _walletAddr, secret)

    const params = {
        url: _registry+'/createMoat',
        method: 'post',
        timeout: 20000,
        data: {
            encryptedKey: encryptedKey,
            publicKey: keys.publicKey.n,
            moat: _moat,
            address: _walletAddr,
            secret: encryptedSecret
        }
    };
    let response = await axios(params)
    response.data.privateKey = privateKey
    response.data.secret = secret
    return response.data
}

module.exports = createMoat