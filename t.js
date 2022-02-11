
const KwilDB = require('./index.js')
const { decryptKey } = require('./src/utils/decryptKey.js')

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test7',
    apiKey: '][/riZP/ilT:qu&IA#Rhg[&e[[Ukp{]N',
}, '($CezT*l2/~LA4/U2%@wANht55~{nir%')

const testF = async () => {
    //console.log(await kwilDB.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'test';`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh;'))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test7', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    kwilDB.query(`CREATE TABLE testtabl2(test_col text)`, true)
}

//testF()