const { initContract, isValidAddress } = require("./utils")

const transferValidator = async (_pool, _chain, _token, _newValidator, _privateKey = null) => {
    if (!isValidAddress(_newValidator)) {
        throw new Error('Invalid address')
    }
    const contract = await initContract(_chain, _token, _privateKey)

    const gasPrice = await contract.methods.transferValidator(_pool, _newValidator).estimateGas({gasPrice: gasPrice})

    const response = await contract.methods.transferValidator(_pool, _newValidator).estimateGas({gasPrice: gasPrice}).send({
        gasPrice: gasPrice,
        gas: gasEstimate * 1.2,
        from: _addr
    })
    return response
}

module.exports = {transferValidator}