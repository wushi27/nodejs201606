var fs = require('fs');
//同步操作
fs.writeFileSync('test.txt','我是中国人','utf8');
var content = fs.readFileSync('test.txt','utf8');
console.log(content);
//异步操作
fs.writeFile('test.txt','中国人',function(err){
    console.log(err);
});
fs.readFile('test.txt',function(err,data){
    console.log(data);//<Buffer e4 b8 ad e5 9b bd e4 ba ba>
    console.log(data.toString());
});