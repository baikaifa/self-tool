//注意仅支持80端口
const express = require('express');
const auth = require('./wechat/auth');
const app = express();
app.use(auth())
app.listen(80, () => console.log('服务器启动成功了'));


