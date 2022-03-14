const { initContract, isValidAddress, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");
const Web3 = require('web3');

const createFundingPool = async (_name, _addr, _validator, _chain, _token, _moat, _privateKey = null) => {
    try {
        const web3 = new Web3(window.ethereum)
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
        const transactionParameters = {
            to: fundingPools[_chain].tokens[_token], // Required except during contract publications.
            from: _addr, // must match user's active address.
            data: contract.methods.createPool(_name, _validator, _moat).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
        };
        const txHash0 = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        function getTransactionReceiptMined(txHash, interval) {
            const transactionReceiptAsync = function(resolve, reject) {
                web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
                    if (error) {
                        reject(error);
                    } else if (receipt == null) {
                        setTimeout(
                            () => transactionReceiptAsync(resolve, reject),
                            interval ? interval : 500);
                    } else {
                        resolve(receipt);
                    }
                });
            };
            if (typeof txHash === "string") {
                return new Promise(transactionReceiptAsync);
            } else {
                throw new Error("Invalid Type: " + txHash);
            }
        }
        const response = await getTransactionReceiptMined(txHash0)
        console.log(response);
        return response

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {createFundingPool}