const axios = require('axios')
const create = require('./create.js')

const createConnector = (_credentials) => {
    const params = create(_credentials)
    class kwildb {
        constructor(_credentials) {
            
        }
        connectionParams = params

        query = async (_query, _store = false) => {
            let _params = JSON.parse(JSON.stringify(params)) //we must copy the params since we will be writing to them
            _params.data.query = _query
            _params.data.store = _store
            _params.url = params.url + '/raw' //use .slice to copy
            const response = await axios(_params)
            return response.data
        }

        storeFile = async (_location, _file, _store=true) => {
            let _params = params //we must copy the params since we will be writing to them

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

        storePhoto = async (_location, _file, _store = true) => {
            let _params = params //we must copy the params since we will be writing to them

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
    }

    const retVal = new kwildb()
    return retVal
}

module.exports = createConnector