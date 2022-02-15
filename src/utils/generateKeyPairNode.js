const crypto = require('crypto')
const pem2jwk = require('pem-jwk').pem2jwk

async function generateKeyPairNode() {
if (typeof crypto.generateKeyPair == "function") {
    //running in nodejs
    const keys = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,    // options
        publicExponent: 0x10001,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        }
      }
    )
    return {publicKey: pem2jwk(keys.publicKey), privateKey: pem2jwk(keys.privateKey)}
} else {throw new Error('Not in nodejs')}
}

module.exports = generateKeyPairNode