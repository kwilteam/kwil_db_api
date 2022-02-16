const createConnector = require('./src/main.js')
const createConnectorRegistry = require('./src/mainRegistry.js')
const createMoat = require('./src/createMoat.js')
const getMoats = require('./src/getMoats')

const KwilDB = {createConnector, createMoat, createConnectorRegistry,getMoats}

module.exports = KwilDB