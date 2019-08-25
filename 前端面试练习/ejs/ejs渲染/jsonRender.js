const ejs=require('ejs');

ejs.renderFile('./views/2.ejs',{json:{arr:[
    {user:'blue',pass:'123456'},
    {user:'zhangsan',pass:'99999'},
    {user:'xiaoming',pass:'98756'},
]}},function (err,data){
    console.log(data);
})