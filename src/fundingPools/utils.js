const providers = require('@ethersproject/providers')
const Contract = require('@ethersproject/contracts')
const address = require('@ethersproject/address')
const fundingPools = require('./fundingPools.json')
const abi = require('./abi.json')

const initContract = async (_chain, _token, _privateKey = null) => {
    const endpoint = fundingPools[_chain].RPC
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contractAddr = fundingPools[_chain].tokens[_token]
    //console.log(contractAddr);
    await window.ethereum.enable();
    const contract = new Contract.Contract( contractAddr,abi.abi,signer)

    return contract
}

const initContractDry = async (_chain, _token) => {
    const endpoint = fundingPools[_chain].RPC
    const provider = new providers.AlchemyProvider(fundingPools[_chain].provider_network,fundingPools[_chain].APIKey);
    const contractAddr = fundingPools[_chain].tokens[_token]
    const contract = new Contract.Contract(contractAddr,abi.abi,provider )

    return contract
}

const isValidAddress = (_addr) => {
    return address.isAddress(_addr)
}

const getGasPrice = async () => {
    const provider = new providers.Web3Provider(window.ethereum)
    const gasPrice = await provider.getGasPrice()
    //console.log(gasPrice);
    return gasPrice
}

module.exports = {initContract, isValidAddress, initContractDry, getGasPrice}