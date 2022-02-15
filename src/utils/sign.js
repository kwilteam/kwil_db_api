const rs = require('jsrsasign')

const sign = (_data, _privateJWK) => {
    const privateKey = rs.KEYUTIL.getKey(_privateJWK);
    var sig = new rs.crypto.Signature({ alg: 'SHA384withRSA' });
    sig.init(privateKey);
    sig.updateString(_data);
    let signature = sig.sign();
    return signature;
};

module.exports = {sign}