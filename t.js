
const KwilDB = require('./index.js')

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    user: 'kwil',
    password: 'password',
    moat: 'kwil1'
})

const testF = async () => {
    //console.log(await kwilDB.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'test';`))
    console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh;'))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'kwil1', 'kwil', 'password'))
}

testF()