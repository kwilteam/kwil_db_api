const KwilDB = require('./index.js')
const fs = require('fs')
let devKey
let photo
if (fs.existsSync('./devKey.js')) {
    devKey = require('./devKey.js')
    //photo = fs.readFileSync('./headshot.jpg')
    //photo = photo.toString('base64')
}

/*const kwilDB = KwilDB.createConnector({
    host: 'test-db.kwil.xyz',
    protocol: 'https',
    moat: 'test13',
    privateKey: devKey.test11Key,
}, devKey.test11Secret)*/

const kwilDB = KwilDB.createConnector({
    host: 'localhost',
    protocol: 'http',
    port: 1984,
    moat: 'test12',
    privateKey: devKey.test10Key,
}, devKey.test10Secret)


const testF = async () => {
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test12', 'myPassword', 'myWallet'))
    //console.log(await KwilDB.createMoat('https://test-db.kwil.xyz', 'test14', 'myPassword', 'myWallet'))
    //console.log(await kwilDB.query(`drop database admin;`))
    //console.log(await kwilDB.query(`CREATE TABLE test_table(test_col varchar(10))`))
    //console.log(await kwilDB2.query(`DROP TABLE test_table;`))
    //console.log(await kwilDB.query('CREATE TABLE IF NOT EXISTS yuh (test_col varchar(10))', true))
    //console.log(await kwilDB.preparedStatement('INSERT INTO yuh(test_col) VALUES ($1);', ['hi'], true))
    //console.log(await kwilDB.query('SELECT * FROM yuh;'))
    //console.log(await kwilDB.storeJPEG('test/yuh2', photo, true))
    //console.log(await KwilDB.createMoat('http://localhost:1984', 'test10', 'kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1'))
    //console.log(await decryptKey('kwilSIG', '0xEF94BD30AA33de1677D7614D17aA39D493a485F1', 'U2FsdGVkX1+154CCJHU2FUrV7DOd1INDyidhHpf+ciebVG/s3R/uWVPh5PRy6A64L+o/n2Z19L/YUKixGRpl6A=='))
    //console.log(await kwilDB.createTable('table2' , {test: {}, username: 'varchar(100)'}))
    //kwilDB.query(`INSERT INTO testtabl3 (test_col) VALUES ('hi')`, true)
}

//testF()