
//让出执行权，用setTimeout(function(){},0);同步方法先执行，然后是异步的。
console.log('第一');
setTimeout(function(){
    console.log('第二');
},0);
console.log('第三');
console.log('第四');


