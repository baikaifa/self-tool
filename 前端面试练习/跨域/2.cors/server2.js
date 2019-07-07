let express=require('express');
let app=express();

let whitList=['http://localhost:3000']

app.use(function (req,res,next){
    let origin=req.headers.origin;
    if(whitList.includes(origin)){
        
        res.setHeader('Access-Control-Allow-Origin',origin);
        //设置那个源可以访问我
        
        res.setHeader('Access-Control-Allow-Headers','name');
        res.setHeader('Access-Control-Allow-Methods','PUT');
        res.setHeader('Access-Control-Max-Age',6);//预检的存活时间 
        res.setHeader('Access-Control-Allow-Credentials',true);//允许携带cookie
        res.setHeader('Access-Control-Expose-Headers','name');//允许返回的头
        if(req.method==='OPTIONS'){
            res.end();//PUT请求不作任何处理
        }
    }
    next();
})
app.put('/getData',function (req,res){
    console.log(req.headers);
    res.setHeader('name','jw');
    res.end("我不爱你")
})
app.get('/getData',function (req,res){
    console.log(req.headers);
    res.end("我不爱你")
})
app.use(express.static(__dirname))
app.listen(4000);