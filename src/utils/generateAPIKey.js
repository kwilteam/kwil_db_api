const generateAPIKey = (_length=32) => {
    const validChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.<>/?;:[]{}|+=_-)(*&^%$#@!~';
    let salt = '';
    for (let i = 0; i < _length; i++) {
        const randomElement = Math.floor(Math.random() * validChars.length);
        salt = salt + validChars[randomElement];
    }
    return salt;
};

module.exports = {generateAPIKey}
