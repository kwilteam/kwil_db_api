const { initContractDry } = require('./utils')

const getPool = async (_pool, _chain, _token) => {
    const contract = await initContractDry(_chain, _token)
    const response = await contract.methods.moats(_pool).call()
    return response
}

module.exports = {getPool}