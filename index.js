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

    console.time('query')
    /*await connector.query(`BEGIN`)
    await connector.query(`UPDATE yuh SET testing = 'hi'`)
    await connector.query(`COMMIT`)*/
    console.timeEnd('query')


    //let photoData = fs.readFileSync('./headshot.jpg')
    //photoData = photoData.toString('base64')

    //const response = await connector.query(`INSERT INTO yuh (testing) values ('hi');`)
    //const response = await connector.query(`CREATE TABLE final(testing varchar(5));`)
    //const response = await connector.query(`DELETE FROM yuh WHERE testing = 'hi';`)
    //const response = await connector.query(`update yuh set testing = 'bye' where testing='hi';`)
    //const response = await connector.query(`SELECT * FROM yuh;`)
    //console.log(response)
    //const yuh = new connector.Transaction()
    const yuh = connector.createTransaction()
    yuh.begin()
    yuh.query('SELECT * FROM yuh;')
    yuh.commit()
    console.log(yuh)
    //const response = await connector.storePhoto('images/test', photoData)
    //const response = await connector.storeFile('images/test', 'noice')





}

//testF()

module.exports = createConnector