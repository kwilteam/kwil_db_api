const generateAPIKey = () => {
    const validChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.<>/?;:[]{}|+=_-)(*&^%$#@!~';
    let salt = '';
    for (let i = 0; i < 32; i++) {
        const randomElement = Math.floor(Math.random() * validChars.length);
        salt = salt + validChars[randomElement];
    }
    return salt;
};
module.exports = {generateAPIKey}
