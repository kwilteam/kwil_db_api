const { initContract, isValidAddress, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");
const ethers = require('ethers')

const createFundingPool = async (_name, _addr, _validator, _chain, _token, _moat, _privateKey = null) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await window.ethereum.enable();
        if (!isValidAddress(_validator)) {
            throw new Error(`${_validator} is not a valid address`)
        }
        const contract = await initContract(_chain, _token, _privateKey)
        /*const gasPrice = await getGasPrice()
        const gasEstimate = await contract.methods.createPool(_name, _validator, _moat).estimateGas({from:_addr})
        console.log(gasPrice);
        console.log(gasEstimate);
        const response = await contract.methods.createPool(_name, _validator, _moat).send({
            gasPrice: Math.ceil(gasPrice * 1.2),
            gas: Math.ceil(gasEstimate * 1.2),
            from: _addr
        })*/
        console.log(contract);
        const transactionParameters = {
            to: fundingPools[_chain].tokens[_token], // Required except during contract publications.
            from: _addr, // must match user's active address.
            data: await contract.createPool(_name, _validator, _moat), // Optional, but used for defining smart contract creation and interaction.
        };
        const txHash0 = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log(txHash0);
        return 1

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {createFundingPool}