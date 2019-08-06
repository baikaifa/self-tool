// 注意仅支持80端口
const express = require('express');
const router=require('./router');
const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(router);
app.listen(80, () => console.log('服务器启动成功了'));


 