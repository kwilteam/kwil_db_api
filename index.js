const createConnector = require('./src/main.js')
const createConnectorRegistry = require('./src/mainRegistry.js')
const createMoat = require('./src/createMoat.js')

const KwilDB = {createConnector, createMoat}
const KwilDB2 = {createConnectorRegistry}

module.exports = {KwilDB,KwilDB2}