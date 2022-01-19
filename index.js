import createConnector from "./src/main.js"


const testF = async () => {

    const connector = await createConnector({
        host: 'localhost',
        protocol: 'http',
        database: 'postgres',
        port: 5432,
        user: 'postgres',
        password: 'password',
        moat: 'testmoat'
    })

    const response = await connector.query(`Select * from testies;`)

    console.log(response.rows)
}

export default createConnector