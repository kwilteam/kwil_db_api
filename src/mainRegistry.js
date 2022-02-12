const createRegistry = require("./createRegistry.js");
const {sha384} = require("./utils/sha384");
const axios = require("axios");
const table = require("./createTable");
const Transaction = require("./transactions");
const {createWebSocket} = require("./websocket");
const createConnectorRegistry = (_credentials, _secret) => {
    const secret = _secret.slice()
    const params = createRegistry(_credentials)
    class KwilDB {

        connectionParams = params

        addMoat = async (_moat, _owner,_apiKey,_secret, _store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.moat = _moat
            _params.data.owner = _owner
            _params.data.apiKey = _apiKey
            _params.data.secret = _secret
            _params.data.store = _store
            _params.url = _params.url + '/addMoat'
            const response = await axios(_params)
            return response.data
        }

        addSecret = async (_moat, _secret,_timestamp, _store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.moat = _moat
            _params.data.timestamp = _timestamp
            _params.data.secret = _secret
            _params.data.store = _store
            _params.url = _params.url + '/addSecret'
            const response = await axios(_params)
            return response.data
        }

        getMoats = async (_owner) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.owner = _owner
            _params.url = _params.url + '/getMoats'
            const response = await axios(_params)
            return response.data
        }

        getSecrets = async (_moat) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.moat = _moat
            _params.url = _params.url + '/getSecrets'
            const response = await axios(_params)
            return response.data
        }

    }

    const retVal = new KwilDB()
    retVal.createTransaction = () => {
        return new Transaction(params)
    }
    retVal.createWebSocket = () => {
        const b = createWebSocket(params)
        return b
    }
    return retVal
}

module.exports = createConnectorRegistry