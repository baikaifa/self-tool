const sha1 = require('sha1');
const config = require('../config');
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils/tool');
const template=require('./template');
const reply=require('./reply');
module.exports = () => {
    return async (req, res, next) => {
        const { signature, echostr, timestamp, nonce } = req.query;
        const { token } = config;
        const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
        if (req.method === 'GET') {
            if (sha1Str === signature) {
                res.send(echostr)
            } else {
                res.end('error');
            }
        } else if (req.method === 'POST') {
            if (sha1Str !== signature) {
                res.send('error');
            }
            const xmlData = await getUserDataAsync(req);
            const jsData = await parseXMLAsync(xmlData);
            const message = formatMessage(jsData);
            // console.log('message');
            // console.log(message);
            const options=reply(message);
            // console.log('options');
            // console.log(options);
            const replyMessage = template(options);
            console.log('replyMessage');
            console.log(replyMessage);
            res.send(replyMessage);
            // res.end('');
        } else {
            res.end('error');
        }
    }
}

