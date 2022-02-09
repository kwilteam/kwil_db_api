const jssha = require('jssha')
const b64 = require('base64url')
const sha384 = (_text) => {
    try {
        if (_text != null){
    const shaObj = new jssha('SHA-384', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(_text);
    const b64Hash = shaObj.getHash('B64');
    return b64.fromBase64(b64Hash);
    } else {
        return ''
    }
    } catch(e) {
        console.log(e)
        throw new Error('Tried to hash something that is not a string. Make sure all inputs are correctly formatted.')
    }
};

module.exports = {sha384}