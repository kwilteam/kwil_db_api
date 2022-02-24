const axios = require("axios");


getPoolsByMoat = async (_registry,_moat) => {

    const params = {
        url: _registry+'/getFundingPools',
        method: 'post',
        timeout: 20000,
        data: {
            moat:_moat,
        }
    };

    let _params = JSON.parse(JSON.stringify(params))

    //Putting a warning here, honestly for my sake more than anything else
    const response = await axios(_params)
    return response.data
}

module.exports = getPoolsByMoat