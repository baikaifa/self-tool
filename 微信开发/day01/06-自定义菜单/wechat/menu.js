const {url}=require('../config');
module.exports = {
    "button": [
        {
            "type": "click",
            "name": "戳我啊",
            "key": "CLICK"
        },
        {
            "name": "菜单二",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": `${url}/search`
                },
                {
                    "type": "miniprogram",
                    "name": "wxa",
                    "url": "http://mp.weixin.qq.com",
                    "appid": "wx286b93c14bbf93aa",
                    "pagepath": "pages/lunar/index"
                },
                {
                    "type": "scancode_waitmsg",
                    "name": "扫码带提示",
                    "key": "扫码带提示"
                }]
        }] 
}