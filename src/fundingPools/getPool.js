const { initContractDry } = require('./utils')

const getPool = async (_pool, _chain, _token) => {
    const contract = await initContractDry(_chain, _token)
    const response = await contract.pools(_pool);
    return response
}

module.exports = {getPool}