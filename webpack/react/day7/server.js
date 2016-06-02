/**
 * Created by 170157 on 2016/5/30.
 */
var express = require('express');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/getdata',function(req,res){
    res.send([[
                {author: "Pete Hunt111", text: "This is one comment111"},
                {author: "Jordan Walke222", text: "This is *another* comment222"}
            ]]);
});
app.listen(9999);
