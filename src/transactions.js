const axios = require('axios')

class Transaction {
    constructor(_params) {
        this.params = _params
        this.sql = []
    }

    begin () {
        this.sql.push('BEGIN')
    }

    query(_string) {
        this.sql.push(_string)
    }

    commit() {
        this.sql.push('COMMIT')

    }
}

/*const T = function() {

}*/

module.exports = Transaction