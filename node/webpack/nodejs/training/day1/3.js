/**
 * Created by 170157 on 2016/6/2.
 */
var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){
    console.log(req.method);
    console.log(typeof req.url);
    console.log(url.parse(req.url));//转换为一个对象。
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('name','helloworld');
    //设置响应类型
    res.setHeader('content-Type','text/html;charset=utf-8');
    res.write(new Date().toString());
    res.end();//挂断
});

server.listen(9991,'localhost');
