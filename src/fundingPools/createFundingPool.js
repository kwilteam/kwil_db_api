const fundingPools = require('./fundingPools.json')
const web3Utils = require('web3-utils')
const Contract = require('web3-eth-contract')
const abi = require('./abi.json')
const Web3Eth = require('web3-eth')
//0x013b75E935Ab46e38A4e39C44269186C7c520deb

const Web3 = require('web3')

function isValidAddress (_string) {
    return web3Utils.isAddress(_string)
}

const createFundingPool = async (_name, _validator, _chain, _token, _privateKey = null) => {
    if (!isValidAddress(_validator)) {
        throw new Error('Invalid Validator Address')
    }
    try {
        const endpoint = fundingPools[_chain].RPC
        const web3 = new Web3(endpoint)
        const contractAddr = fundingPools[_chain].tokens[_token]
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        if (accounts.length < 1 && _privateKey == null) {
            throw new Error('Must have an Eth account')
        } else if (_privateKey != null) {
            web3.eth.accounts.wallet.add(_privateKey)

        }

        //console.log(web3.eth.accounts.wallet.create(1))
        //console.log(web3.eth.accounts.wallet)
        const contract = new web3.eth.Contract(abi.abi, contractAddr)
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