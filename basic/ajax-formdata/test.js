/**
 * Created by 170157 on 2016/5/9.
 */
var http = require('http');
var formidable = require('formidable');
var url = require('url');
var  fs = require('fs');
//console.log(formidable);
//console.log(http);
http.createServer(function(req,res){
    //console.log(req);
    //res.end('hello,world');
    var urlobj = url.parse(req.url,true);
    //console.log(urlobj);
    var pathname = urlobj.pathname;

     if(pathname=="/")	//访问表单页面
     {
            res.writeHead(200,{"Content-Type":"text/html"});
            fs.readFile("6.html","utf-8",function(e,data){
                res.write(data);
                res.end();
            });
    }

    else if(pathname == '/hello'){
        res.end('aaa');
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            console.log(fields);
            console.log('--------------------');
            console.log(files['uploadFiles[]']);
            console.log(files['uploadFiles[]']['path']);
            var src = fs.createReadStream(files['uploadFiles[]'].path);
            var dest = fs.createWriteStream(files['uploadFiles[]'].name);
            src.pipe(dest);

        });
    }


}).listen(9999);