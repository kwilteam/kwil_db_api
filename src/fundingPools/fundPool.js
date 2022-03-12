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

        const gasEstimateApproval = await allowanceContract.methods.approve(contractAddress, _amt).estimateGas({from: _addr})
        console.log(gasEstimateApproval);

        await allowanceContract.methods.approve(contractAddress, _amt).send({from: _addr,gasPrice: Math.ceil(gasPrice * 1.3), gas: Math.ceil(gasEstimateApproval * 1.3)},
            function(err, transactionHash) {
                console.log(err);
                console.log(transactionHash);
            });
        const gasEstimate = await contract.methods.fundPool(_name, 0).estimateGas({from: _addr})
        console.log(gasEstimate);
        const response = await contract.methods.fundPool(_name, _amt).send({
            gasPrice: Math.ceil(gasPrice*1.3),
            gas: Math.ceil(gasEstimate * 1.3),
            from: _addr
        })

        return response

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {fundPool}