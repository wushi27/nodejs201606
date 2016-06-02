//提升速度。
//如果不想程序在查询数据时卡死或等待过长时间，
// 一般不推荐在node中开启一个连接后全部查询都用这个链接并且不关闭，
// 因为，你试了就知道为什么了

var mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'test1'
});
//console.log(connection);
//创建连接
var query=function(sql,data,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,data,function(qerr,results,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,results,fields);
            });
        }
    });
};

//增加item
query('insert into content(author,text) values(?,?)',['hello','contents'],function(err,results,fields){
    console.log(results.insertId);
});

//修改语句
query('update content set author=?,text=? where id=?',['aaaa','aaa content',2],function(err,results,fields){
    console.log(results.affectedRows);
});

//查询语句
query('select * from content',[],function(err,results,fields){
    console.log(results);
});

