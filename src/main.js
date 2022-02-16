const axios = require('axios')
const create = require('./create.js')
const Transaction = require('./transactions.js')
const {createWebSocket} = require('./websocket.js')
const table = require('./createTable.js') //Importing like this because I want the function to be called createTable
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
            const response = await axios(_params)
            return response.data
        }

        storeFile = async (_location, _file, _store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            if ((_location[0] == '.' && _location[1] == '/')|| _location[0] == '/') {
                console.log('WARNING: You started a photo path with either "." or "/".  Natively, files will already write with those.  Maybe consider deleting')
            }

            const dataWrite = createDataWrite({file: _file, path: _location}, _store, secret, _params.data.moat, privateKey)
            _params.data = dataWrite
            _params.url = _params.url + '/storeFile'
            console.log(_params)
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
            console.log(_params)
            const response = await axios(_params)
            return response.data
        }

        createTable = async (_name, _schema) => {
            await table.createTable(_name.toLowerCase(), _schema, params)
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