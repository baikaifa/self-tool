const express=require('express');
const sha1 = require('sha1');
const reply = require('../reply');
const Wechat = require('../wechat/wechat');
const { url } = require('../config');
const Router=express.Router;

const router=new Router;

const wechatApi = new Wechat();
router.use('/search', async (req, res) => {
    const noncestr_string = String(Math.random());
    noncestr = noncestr_string.split('.')[1];
    const timestamp = Date.now();
    //const timestamp = Number(String((Date.now()/1000)).substring(0,10));
    const { ticket } = await wechatApi.fetchTicket();
    const arr = [
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ];
    const str = arr.sort().join('&');
    const signature = sha1(str);
    console.log(arr[0],'///',arr[1],'///',arr[2]);
    console.log(signature);
    res.render('search', {
        signature,
        noncestr,
        timestamp
    });
})
router.use(reply());
module.exports=router;