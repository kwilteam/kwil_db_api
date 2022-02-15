const axios = require('axios')
const create = require('./create.js')
const Transaction = require('./transactions.js')
const {createWebSocket} = require('./websocket.js')
const table = require('./createTable.js') //Importing like this because I want the function to be called createTable
const { sha384 } = require('./utils/sha384.js')
const createConnector = (_credentials, _secret) => {
    const secret = _secret.slice()
    const params = create(_credentials)
    class KwilDB {

        connectionParams = params

        query = async (_query, _store = false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            const timestamp = Date.now()
            _params.data.query = _query
            _params.data.store = _store
            _params.data.timestamp = timestamp
            _params.data.hash = sha384(_query+timestamp.toString()+secret)
            _params.url = params.url + '/raw' //use .slice to copy
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

        storeFile = async (_location, _file, _store=false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them

            //Putting a warning here, honestly for my sake more than anything else

            if ((_location[0] == '.' && _location[1] == '/')|| _location[0] == '/') {
                console.log('WARNING: You started a photo path with either "." or "/".  Natively, files will already write with those.  Maybe consider deleting')
            }

            _params.data.path = _location
            _params.data.file = _file
            _params.data.store = _store
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

            _params.data.path = _location
            _params.data.image = _file
            _params.data.store = _store
            _params.url = _params.url + '/storePhoto'
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