const axios = require('axios')
const createTable = async (_name, _schema, _params) => {
    /*
    Schema should look like {table_name: type}
    */
   const params = JSON.parse(JSON.stringify(_params))
   params.url = params.url + '/createTable'
   params.data = {
       name: _name,
       schema: _schema
   }
   const response = await axios(params)
   return response.data
}

module.exports = {createTable}