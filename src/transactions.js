const axios = require('axios')

class Transaction {
    constructor(_params) {
        this.params = _params
        this.params.data.sql = []
    }

    begin () {
        this.params.data.sql.push('BEGIN;')
    }

    query(_string) {
        this.params.data.sql.push(_string)
    }

    async commit(_store = false) {
        this.params.data.store = _store
        this.params.data.sql.push('COMMIT;')
        this.params.url = this.params.url.split() + '/transaction' //copies in case of fail
        const response = await axios(this.params)
        return response
    }
}

/*const T = function() {

}*/

module.exports = Transaction