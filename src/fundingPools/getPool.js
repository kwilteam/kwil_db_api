const { initContractDry } = require('./utils')

const getPool = async (_pool, _chain, _token) => {
    console.time('h')
    const contract = await initContractDry(_chain, _token)
    console.timeLog('h')
    const response = await contract.pools(_pool);
    console.timeEnd('h')
    return response
}

module.exports = {getPool}