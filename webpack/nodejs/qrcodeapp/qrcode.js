var qr = require('qr-image');
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/qrcode',function(req,res){

    var urlText = 'http://172.16.20.76:9996/index.html';

    try{
        var img = qr.image(urlText,{size:5});
        res.writeHead(200,{'Content-Type':'image/png'});
        img.pipe(res);
    }catch(e){
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');

    }
});
app.listen(9996);