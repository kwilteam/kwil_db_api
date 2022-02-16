const axios = require("axios");


getMoats = async (_registry,_owner) => {

    const params = {
        url: _registry+'/getMoats',
        method: 'post',
        timeout: 20000,
        data: {
            owner:_owner,
        }
    };

    let _params = JSON.parse(JSON.stringify(params))

    //Putting a warning here, honestly for my sake more than anything else
    const response = await axios(_params)
    return response.data
}

module.exports = getMoats