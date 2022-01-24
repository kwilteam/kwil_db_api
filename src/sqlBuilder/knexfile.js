const knex = require('knex')

//Just using this for knex sql abilities

module.exports = knex({
    client: 'postgresql', 
    connection: {user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5555,}
})

