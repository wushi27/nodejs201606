var mysql = require('mysql');

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'test1'
});
//console.log(connection);
//创建连接
conn.connect();
//增加item
conn.query('insert into content(author,text) values(?,?)',['hello','contents'],function(err,result){
    console.log(result.insertId);
});

//修改语句
conn.query('update content set author=?,text=? where id=?',['aaaa','aaa content',2],function(err,results){
    console.log(results.affectedRows);
});

//查询语句
conn.query('select * from content',function(err,results,fields){
    console.log(results);
});

//关闭mysql连接
conn.end();