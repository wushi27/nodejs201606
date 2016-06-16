/**
 * Created by 170157 on 2016/6/2.
 */
var http = require('http');

var server = http.createServer(function(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('name','helloworld');
    //设置响应类型
    res.setHeader('content-Type','text/html;charset=utf-8');
    res.write(new Date().toString());
    res.end();//挂断
});

server.listen(9991,'localhost');
