const { initContract, isValidAddress, getGasPrice } = require('./utils')
const fundingPools = require("./fundingPools.json");

const createFundingPool = async (_name, _addr, _validator, _chain, _token, _moat, _privateKey = null) => {
    try {
        await window.ethereum.enable();
        if (!isValidAddress(_validator)) {
            throw new Error(`${_validator} is not a valid address`)
        }
        const contract = await initContract(_chain, _token, _privateKey)

        //console.log(contract);
        const tx = await contract.createPool(_name, _validator, _moat);
        const receipt = await tx.wait();
        return receipt;

    } catch(e) {
        console.log(e)
        return e.message;
    }
}

module.exports = {createFundingPool}