/**
 * Created by 170157 on 2016/5/24.
 */
var express = require('express');
var app = express();

app.get('/check',function(req,res){
    var data = req.query;
    var callback = data.callback;
    if(data.username =='admin'){
        res.send(callback+'('+JSON.stringify({unique:false})+')');
    }else{
        res.send(callback+'('+JSON.stringify({unique:true})+')');
    }

});

app.listen(9999);
