const {KwilDB} = require('./index.js')
const {KwilDB2} = require('./index.js')
const { decryptKey } = require('./src/utils/decryptKey.js')
const b64String = require('./testFiles/testFile')

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test7',
    apiKey: '9ydoed[GGu,KJ<m6Wm<FhrdHY;fl5bpX',
}, 'o~>halS(K>UJ]ET1[Gh?Uo-#rr3Dp[=>')

const kwilDB2 = KwilDB2.createConnectorRegistry({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test7',
    apiKey: '9ydoed[GGu,KJ<m6Wm<FhrdHY;fl5bpX',
}, 'o~>halS(K>UJ]ET1[Gh?Uo-#rr3Dp[=>')


const testF = async () => {
    //console.log(await kwilDB.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'test';`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh;'))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test7', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    //kwilDB.query(`CREATE TABLE testtabl2(test_col text)`, true)
    //await kwilDB.storeJPEG('images/img.jpg',b64String,false);
    //await kwilDB.storeFile('text/txt.txt',b64String.string,false);
    //await kwilDB.addMoat('testmoat','random owner address','randomapikey','superencryptedsecret');

    //await kwilDB.addSecret('testmoat','secret2',Date.now());
    //console.log(await kwilDB.getMoats('random owner address'));
    console.log(await kwilDB2.getSecrets('testmoat'));
}

testF()