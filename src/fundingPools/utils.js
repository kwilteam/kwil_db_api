const Web3 = require('web3')
const fundingPools = require('./fundingPools.json')
const abi = require('./abi.json')

const initContract = async (_chain, _token, _privateKey = null) => {
    const endpoint = fundingPools[_chain].RPC
    const web3 = new Web3(endpoint)
    const contractAddr = fundingPools[_chain].tokens[_token]
    const accounts = await web3.eth.getAccounts()

    if (accounts.length < 1 && _privateKey == null) {
        throw new Error('Must have an Eth account')
    } else if (_privateKey != null) {
        web3.eth.accounts.wallet.add(_privateKey)
    }
    const contract = new web3.eth.Contract(abi.abi, contractAddr)

    return contract
}

const initContractDry = async (_chain, _token) => {
    const endpoint = fundingPools[_chain].RPC
    const web3 = new Web3(endpoint)
    const contractAddr = fundingPools[_chain].tokens[_token]
    const contract = new web3.eth.Contract(abi.abi, contractAddr)

    return contract
}

const isValidAddress = (_addr) => {
    return Web3.utils.isAddress(_addr)
}

const getGasPrice = async () => {
    const gasPrice = await Web3.eth.getGasPrice()
    return gasPrice
}

module.exports = {initContract, isValidAddress, initContractDry, getGasPrice}