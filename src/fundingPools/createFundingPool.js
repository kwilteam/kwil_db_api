const fundingPools = require('./fundingPools.json')
const abi = require('./abi.json')
const Web3 = require('web3')
const { initContract, isValidAddress } = require('./utils')

const createFundingPool = async (_name, _validator, _chain, _token, _privateKey = null) => {
    try {
        if (!isValidAddress(_validator)) {
            throw new Error(`${_validator} is not a valid address`)
        }
        const contract = await initContract(_chain, _token, _privateKey)
        const gasPrice = await web3.eth.getGasPrice()
        const gasEstimate = await contract.methods.createMoat(_name, _validator).estimateGas({gasPrice: gasPrice})
        const response = await contract.methods.createMoat(_name, _validator).send({
            gasPrice: gasPrice,
            gas: gasEstimate * 1.2,
            from: _addr
        })

        return response

    } catch(e) {
        console.log(e)
        return 'failure'
    }
}

module.exports = {createFundingPool}