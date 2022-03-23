const { initContract, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");
const providers = require('@ethersproject/providers')
const Contract = require('@ethersproject/contracts')
const usdcABI = require("./usdcABI.json")
const erc20ABI = require("./erc20ABI.json")

const fundPool = async (_name, _addr ,_chain, _token, _amt, _privateKey = null) => {
    try {
        const provider = new providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        await window.ethereum.enable();
        const contract = await initContract(_chain, _token, _privateKey)
        const contractAddress = fundingPools[_chain].tokens[_token]
        //console.log(usdcABI.abi);
        //console.log(fundingPools[_chain].token_addresses[_token])
        const allowanceContract = await new Contract.Contract(fundingPools[_chain].token_addresses[_token],usdcABI.abi,signer)
        //console.log(allowanceContract);
        const allowanceTx = await allowanceContract.approve(contractAddress, _amt);
        const allowanceReceipt = await allowanceTx.wait();
        const tx = await contract.fundPool(_name, _amt);
        const receipt = await tx.wait();
        return receipt;

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {fundPool}