const fundingPools = require('./fundingPools.json')
const abi = require('./abi.json')
const Web3 = require('web3')
const { initContract } = require('./utils')

const fundPool = async (_name, _chain, _token, _amt, _privateKey = null) => {
    try {
        const contract = await initContract(_chain, _token, _privateKey)

        const gasPrice = await web3.eth.getGasPrice()
        const gasEstimate = await contract.methods.fundMoat(_name, _amt).estimateGas({gasPrice: gasPrice})
        const response = await contract.methods.fundMoat(_name, _amt).send({
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

module.exports = {fundPool}