npm install -g json-server 
json-server --watch data.json
提供一种零编码的方式在30秒内完成一个REST API(讲真)

面向资源编程
资源指的就是一类数据

产品表->就是产品资源

最重要的是如何表示一个资源

地址即资源

-http://api.demo.com/users              -> 应该是 所有的用户数据
-http://api.demo.com/products           -> 所有的产品数据
-http://api.demo.com/productts/iphone   -> 特指iPhone这个商品
-http://api.demo.com/user/1/articles

对于资源我们的代码中可能的从操作只有增删改查
在HTTP协议中对每一个请求URL都会有不同的谓词GET/POST/PUT/DELETE

JSON Server中json文件中的每一个属性就是一个资源，最终会被JSON Server管理