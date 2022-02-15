const createConnector = require('./src/main.js')
const createConnectorRegistry = require('./src/mainRegistry.js')
const createMoat = require('./src/createMoat.js')

const KwilDB = {createConnector, createMoat, createConnectorRegistry}

module.exports = KwilDB