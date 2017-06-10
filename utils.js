let crypto = require('crypto');
module.exports = {
    encry(str){
        return crypto.createHash('md5').update(str).digest('hex');
    }
}