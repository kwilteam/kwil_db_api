const scrypt = require('scrypt-js')
const aes256 = require('react-native-crypto-js')

const decryptKey = async (signature, address, cipherText) => {
    const scryptHash = await scrypt.scrypt(Buffer.from(signature.normalize('NFKC')), Buffer.from(address.normalize('NFKC')), 8192, 8, 1, 32)
    let decryptedKey = aes256.AES.decrypt(cipherText, scryptHash.toString());
    return decryptedKey.toString(aes256.enc.Utf8)
}

module.exports = {decryptKey}