
console.log('第一');
setTimeout(function(){
    console.log('第零');
},0);
//优先级比setTimeout高。
//nextTick是同步队列的最底部，是同步队列优先级最低的。
process.nextTick(function(){
    console.log('第二');
});
console.log('第三');
console.log('第四');



