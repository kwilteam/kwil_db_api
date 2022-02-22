const createConnector = require('./src/main.js')
const createConnectorRegistry = require('./src/mainRegistry.js')
const createMoat = require('./src/createMoat.js')
const getMoats = require('./src/getMoats')
const {decryptKey} = require('./src/utils/decryptKey')
const pools = require('./src/fundingPools/index.js')

const KwilDB = {createConnector, createMoat, createConnectorRegistry,getMoats,decryptKey, pools}

module.exports = KwilDB