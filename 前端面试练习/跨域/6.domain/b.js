let express=require('_express@4.16.4@express');
let app=express();
app.use(express.static(__dirname));
app.listen(4000);