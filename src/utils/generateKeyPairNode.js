let crypto
try {
    crypto = require('crypto')
}catch(e){
    const crypto = null
}
const rs = require('jsrsasign')

const createPubJWK = (_modulus) => {
  return {
      kty: 'RSA',
      n: _modulus,
      e: 'AQAB',
  };
}

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
    const privKey = rs.KEYUTIL.getJWK(keys.privateKey)
    return {publicKey: createPubJWK(privKey.n), privateKey: privKey}
} else {throw new Error('Not in nodejs')}
}

module.exports = generateKeyPairNode