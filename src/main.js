const axios = require('axios')
const create = require('./create.js')
const Transaction = require('./transactions.js')
const {createWebSocket} = require('./websocket.js')
const { createDataWrite } = require('./createDataWrite.js')
const createConnector = (_credentials, _secret) => {
    const secret = _secret.slice()
    const privateKey = _credentials.privateKey
    const params = create(_credentials)
    class KwilDB {

        query = async (_query, _store = false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            const dataWrite = createDataWrite(_query, _store, secret, _params.data.moat, privateKey)
            _params.data = dataWrite
            _params.url = params.url + '/raw'
            console.log(_params)
            const response = await axios(_params)
            return response.data
        }

       /*storeFile = async (_location, _file, _store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            if ((_location[0] == '.' && _location[1] == '/')|| _location[0] == '/') {
                console.log('WARNING: You started a photo path with either "." or "/".  Natively, files will already write with those.  Maybe consider deleting')
            }

            const dataWrite = createDataWrite({file: _file, path: _location}, _store, secret, _params.data.moat, privateKey)
            _params.data = dataWrite
            _params.url = _params.url + '/storeFile'
            const response = await axios(_params)
            return response.data
        }

        storeJPEG = async (_location, _file, _store = false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            if ((_location[0] == '.' && _location[1] == '/')|| _location[0] == '/') {
                console.log('WARNING: You started a photo path with either "." or "/".  Natively, files will already write with those.  Maybe consider deleting')
            }

            const dataWrite = createDataWrite({file: _file, path: _location}, _store, secret, _params.data.moat, privateKey)
            _params.data = dataWrite
            _params.url = _params.url + '/storePhoto'
            const response = await axios(_params)
            return response.data
        }*/

        preparedStatement = async (_query, _inputs, _store = false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            const dataWrite = createDataWrite({query: _query, inputs: _inputs}, _store, secret, _params.data.moat, privateKey)
            _params.data = dataWrite
            _params.url = params.url + '/preparedStatement'
            const response = await axios(_params)
            return response.data
        }

        getMoatFunding = async () => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            _params.url = params.url + '/getMoatFunding'
            //console.log(_params);
            const response = await axios(_params)
            return response.data
        }

        getMoatDebit = async () => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            _params.url = params.url + '/getMoatDebit'
            //console.log(_params);
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

module.exports = createConnector