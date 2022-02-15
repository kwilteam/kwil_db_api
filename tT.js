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

/*const kwilDB2 = KwilDB2.createConnectorRegistry({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test7',
    apiKey: '9ydoed[GGu,KJ<m6Wm<FhrdHY;fl5bpX',
}, 'o~>halS(K>UJ]ET1[Gh?Uo-#rr3Dp[=>')*/

const kwilDB2 = KwilDB2.createConnectorRegistry({
    host: 'registry.kwil.xyz',
    protocol: 'http',
    port: 1984,
    moat: 'test7',
    apiKey: '9ydoed[GGu,KJ<m6Wm<FhrdHY;fl5bpX',
}, 'o~>halS(K>UJ]ET1[Gh?Uo-#rr3Dp[=>')

const sig = "0xed413f72c590a7467f57a51e1238ed8333a4d99d995e7ef46e25b0aa191d877275106abf9690bd126c1fb40c0b0402db4a8092f0dfdf4c938465511f6136548b1c"

const owner ="0xFeE8197af2aAd0d506357d39EF42b3183dcDbc54"


const testF = async () => {
    //console.log(await kwilDB.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'test';`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh;'))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test7', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    //kwilDB.query(`CREATE TABLE testtabl2(test_col text)`, true)
    //await kwilDB.storeJPEG('images/img.jpg',b64String,false);
    //await kwilDB.storeFile('text/txt.txt',b64String.string,false);
    //await kwilDB2.addMoat('testmoat1','owner','randomapikey','superencryptedsecret');

    //await kwilDB.addSecret('testmoat','secret2',Date.now());
    console.log(await kwilDB2.getMoats('owner'));
    //console.log(await kwilDB2.getSecrets('testmoat'));
    //console.log(await kwilDB2.getEncryptedAPIKey('testmoat1'));
    //await kwilDB2.updateSecret('testmoat',sig,'newthingy',owner);
}

testF()