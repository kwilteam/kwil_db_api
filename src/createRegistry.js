const createRegistry = (_credentials) => {

    //Cleaning inputs and giving warnings

    //Trying to make this idiot-proof
    if (_credentials.protocol == null || _credentials.host == null || _credentials.apiKey == null || _credentials.moat == null) {
        throw new Error('Missing a credential.  Mandatory are protocol, host, apiKey, and moat')
        console.log('Input cleaning for connection is disabled, but I can tell you right now the rest of this shit isnt gonna work')
    }

    if (_credentials.protocol == 'http' && _credentials.host != 'localhost') {
        console.log(`WARNING: You are connecting to something other than localhost and using http.  You are transmitting potentially confidential information unencrypted.  You should really use https.`)
    }

    //Setting url with optional port
    let _url;
    if (_credentials.port != null) {
        _url = `${_credentials.protocol}://${_credentials.host}:${_credentials.port}`
    } else {
        _url = `${_credentials.protocol}://${_credentials.host}`
    }

    //Instantiate params.  Backend will handle the pg connection, this client just needs moat and apiKey
    const params = {
        url: _url,
        method: 'post',
        timeout: 20000,
        data: {
            
        }
    };
    return params

}

module.exports = createRegistry