const createRegistry = require("./createRegistry.js");
const axios = require("axios");
const Transaction = require("./transactions");
const {createWebSocket} = require("./websocket");
const ethers = require('ethers');
const createConnectorRegistry = (_credentials, _secret) => {
    //const secret = _secret.slice()
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

        #getEncryptedAPIKey = async (_moat) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.moat = _moat
            _params.url = _params.url + '/getEncryptedAPIKey'
            const response = await axios(_params)
            //console.log(response.data)
            return response.data
        }

        #updateSecretInternal = async (_moat,_signature,_newSecret,_owner,_store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            _params.data.moat = _moat
            _params.data.sig = _signature
            _params.data.secret = _newSecret
            _params.data.owner = _owner
            _params.url = _params.url + '/updateSecret'
            const response = await axios(_params)
            //console.log(response.data)
            return response.data
        }

        updateSecret = async (_moat,_newSecret) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            const encrypt = await this.#getEncryptedAPIKey(_moat);
            console.log(encrypt[0].api_key);
            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            //const salt = gateway.current.generateSalt();
            //console.log(salt);
            const signature = await signer.signMessage(encrypt[0].api_key);
            const address = await signer.getAddress();
            console.log(signature)
            console.log(address)
            await this.#updateSecretInternal(_moat,signature,_newSecret,address);
            /*const response = await axios(_params)
            console.log(response.data)*/
            //return response.data
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