const scrypt = require('scrypt-js')
const aes256 = require('react-native-crypto-js')
var Buffer = require('buffer/').Buffer

const encryptKey = async (signature, address, apiKey) => {
    const scryptHash = await scrypt.scrypt(Buffer.from(signature.normalize('NFKC')), Buffer.from(address.normalize('NFKC')), 8192, 8, 1, 32)
    let cipherText = aes256.AES.encrypt(apiKey, scryptHash.toString())
        cipherText = cipherText.toString()

    return cipherText
}

module.exports = {encryptKey}
