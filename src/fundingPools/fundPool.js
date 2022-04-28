const { initContract, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");
const providers = require('@ethersproject/providers')
const Contract = require('@ethersproject/contracts')
const usdcABI = require("./usdcABI.json")
const erc20ABI = require("./erc20ABI.json")
const BigNumber = require('bignumber.js');

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
        const hi = await allowanceContract.allowance(_addr,contractAddress);
        console.log(hi);
        console.log(hi.toString())
        const BN = new BigNumber(hi.toString())
        console.log(BN);
        console.log(BN.toString())
        console.log(_amt)
        console.log(_amt.toString())
        if (_amt.isGreaterThan(BN)) {
            const allowanceTx = await allowanceContract.approve(contractAddress, _amt.toString());
            const allowanceReceipt = await allowanceTx.wait();
            const tx = await contract.fundPool(_name, _amt.toString());
            const receipt = await tx.wait();
            return receipt;
        }
        else{
            const tx = await contract.fundPool(_name, _amt.toString());
            const receipt = await tx.wait();
            return receipt;
        }

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {fundPool}