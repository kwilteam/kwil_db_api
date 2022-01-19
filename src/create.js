import axios from 'axios'

const create = async (_credentials) => {

    //Cleaning inputs and giving warnings

    //Trying to make this idiot-proof
    if (_credentials.protocol == null || _credentials.host == null || _credentials.user == null || _credentials.database == null || _credentials.password == null) {
        throw new Error('Missing a credential.  Mandatory are protocol, host, user, database, and password')
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

    //Instantiate params.  Backend will handle the pg connection (host and port), this client just needs user to provide, database, and password
    const params = {
        url: _url,
        method: 'post',
        timeout: 20000,
        headers: { 'Content-Type': 'application/json' },
        data: {
            user: _credentials.user,
            database: _credentials.database,
            password: _credentials.password,
            moat: _credentials.moat
        }
    };
    return params

}

export default create