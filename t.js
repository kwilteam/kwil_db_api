
const KwilDB = require('./index.js')
const fs = require('fs')
let devKey
if (fs.existsSync('./devKey.js')) {
    devKey = require('./devKey.js')
}

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test10',
    privateKey: devKey,
}, 'ko#k^lKa=j|UN8!B8j.:g(gNrbD8]UTm')


const testF = async () => {
    //console.log(await kwilDB.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'test';`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh (test_col varchar(10))', true))
    //console.log(await kwilDB.storeFile('test/yuh', 'hello!', true))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test10', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    //kwilDB.query(`INSERT INTO testtabl3 (test_col) VALUES ('hi')`, true)
}

//testF()