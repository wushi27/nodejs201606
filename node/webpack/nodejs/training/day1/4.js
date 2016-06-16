/**
 * Created by 170157 on 2016/6/2.
 */
var http = require('http');
var mime = require('mime');
var fs = require('fs');
function static(url,res){
    console.log(mime.lookup(url));
    res.setHeader('Content-Type',mime.lookup(url)+';charset=utf8');
    fs.readFile(url.slice(1),function(err,data){
        res.write(data);
        res.end();
    });
};
var server = http.createServer(function(req,res){
    var url = req.url;
    console.log(url);
    if(url=='/'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.readFile('index.html',function(err,data){
            res.write(data);
            res.end();
        });
    }else{
        static(url,res);
    }
});
server.listen(9991,'localhost');
