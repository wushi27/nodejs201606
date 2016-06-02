/*
* send:会自动加入一些设置，比如head头信息，http缓存支持等等。
* 可以理解为一个优化过的函数。
*
* */
//get和post获取参数
var express = require('express');
//处理post需要引入这个中间件,处理的是form-data
var formidable = require('formidable');


//处理post需要引入这个中间件,处理的是application/x-www-form-urlencoded
var bodyParser = require('body-parser');

var app = express();
//使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//get通过标准问号方式:
// http://localhost:9998/query?name=111&age=222
app.get('/query',function(req,res){
    res.send([req.query.name,req.query.age]);
});
//get通过/分隔符方式.
//http://localhost:9998/articles/111/haha
app.get('/articles/:id/:name',function(req,res){
   res.send([req.params.id,req.params.name]);
});
//监控一下content-Type:
app.use(function(req,res,next){
    console.log(req.headers['content-type']);
    next();

});

//post：application/x-www-form-urlencoded类型
//req.body属性解析客户端的post请求参数：
app.post('/posturlencoded',function(req,res){
    res.send(req.body.author);
});
//处理post：form-data类型
app.post('/postformdata',function(req,res){
    //创建一个流处理req
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        console.log(fields);
        res.send(fields['author']);
    });
});
app.listen(9998);