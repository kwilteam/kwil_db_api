require(`dotenv`).config()


// Exports config options based on node type.
module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'password',
            port: 5555,
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
    },

    productionG: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            name: process.env.DATABASE_NAME,
            connector: process.env.DATABSE_CONNECTOR
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
}
