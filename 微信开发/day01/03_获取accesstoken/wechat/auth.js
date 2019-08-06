const sha1 = require('sha1');
const config=require('../config');
module.exports = () => {
    return (req, res, next) => {
        const { signature, echostr, timestamp, nonce } = req.query;
        const { token } = config;
        const arr = [timestamp, nonce, token];
        const arrSort = arr.sort();
        const str = arr.join('');
        const sha1Str = sha1(str);
        if (sha1Str === signature) {
            res.send(echostr)
        } else {
            res.end('error');
        }
    }
}