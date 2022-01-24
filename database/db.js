const knex = require(`knex`);
require(`dotenv`).config();


// Retreives node config options (i.e. client, connection, etc.) based on node type.
const knexfile = require(`./knexfile.js`);
const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
