const createConnector = require('./src/main.js')
const fs = require('fs')


const testF = async () => {

    const connector = createConnector({
        host: 'localhost',
        protocol: 'http',
        database: 'postgres',
        port: 5432,
        user: 'postgres',
        password: 'password',
        moat: 'testmoat'
    })

    //let photoData = fs.readFileSync('./headshot.jpg')
    //photoData = photoData.toString('base64')

    //const response = await connector.query(`INSERT INTO yuh (testing) values ('hi');`)
    //const response = await connector.query(`CREATE TABLE final(testing varchar(5));`)
    //const response = await connector.query(`DELETE FROM yuh WHERE testing = 'hi';`)
    //const response = await connector.query(`update yuh set testing = 'bye' where testing='hi';`)
    //const response = await connector.query(`SELECT * FROM yuh;`)
    //const response = await connector.storePhoto('images/test', photoData)
    //const response = await connector.storeFile('images/test', 'noice')





    console.log(response.rows)
}

//testF()

module.exports = createConnector