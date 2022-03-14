const { initContract, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");
const Web3 = require('web3');
const usdcABI = require("./usdcABI.json")
const erc20ABI = require("./erc20ABI.json")

const fundPool = async (_name, _addr ,_chain, _token, _amt, _privateKey = null) => {
    try {
        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable();
        const contract = await initContract(_chain, _token, _privateKey)
        const contractAddress = fundingPools[_chain].tokens[_token]
        const gasPrice = await getGasPrice()
        console.log(gasPrice);
        let abi = erc20ABI.abi;
        /*if (_token=="USDC"){
            abi = usdcABI.abi;
        }
        else{
            abi = erc20ABI.abi;
        }*/
        console.log(usdcABI.abi);
        console.log(fundingPools[_chain].token_addresses[_token])
        const allowanceContract = await new web3.eth.Contract(usdcABI.abi, fundingPools[_chain].token_addresses[_token])
        console.log(allowanceContract);
        const transactionParameters = {
            to: fundingPools[_chain].token_addresses[_token], // Required except during contract publications.
            from:_addr, // must match user's active address.
            data:allowanceContract.methods.approve(contractAddress, _amt).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
        };
        const txHash0 = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log(txHash0);
        function getTransactionReceiptMined(txHash, interval) {
            const self = this;
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
        console.log(await getTransactionReceiptMined(txHash0))

        const transactionParameters2 = {
            to: contractAddress, // Required except during contract publications.
            from:_addr, // must match user's active address.
            data:contract.methods.fundPool(_name, _amt).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
        };
        const txHash2 = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters2],
        });
        console.log(txHash2);

        /*const gasEstimateApproval = await allowanceContract.methods.approve(contractAddress, _amt).estimateGas({from: _addr})
        console.log(gasEstimateApproval);

        console.log(await allowanceContract.methods.approve(contractAddress, _amt).send({from: _addr,gasPrice: Math.ceil(gasPrice * 1.2), gas: Math.ceil(gasEstimateApproval * 1.3)},
            function(err, transactionHash) {
                console.log(err);
                console.log(transactionHash);
            }));*/
        /*const gasEstimate = await contract.methods.fundPool(_name, 0).estimateGas({from: _addr})
        console.log(gasEstimate);
        const response = await contract.methods.fundPool(_name, _amt).send({
            gasPrice: Math.ceil(gasPrice*1.2),
            gas: Math.ceil(gasEstimate * 1.3),
            from: _addr
        })*/

        return await getTransactionReceiptMined(txHash2);

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {fundPool}