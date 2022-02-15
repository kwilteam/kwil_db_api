const { generateAPIKey } = require("./utils/generateAPIKey")
const { sha384 } = require("./utils/sha384")
const { sign } = require('./utils/sign.js')

function createDataWrite(_data, _store, _secret, _moat, _privateJWK) {
    const timestamp = Date.now()
    const hash = sha384(_data+timestamp.toString()+_secret)
    const queryID = generateAPIKey(64)
    const signature = sign({data : _data,
        timestamp: timestamp,
        hash: hash,
        queryID: queryID,
    }, _privateJWK)
    return {
        data : _data,
        timestamp: timestamp,
        hash: hash,
        queryID: queryID,
        signature: signature,
        store: _store,
        moat: _moat
    }
}

module.exports = {createDataWrite}