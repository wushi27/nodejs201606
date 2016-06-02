//表示是es6的一个生成器。
'use strict';
function* say(arr){
    //yield 'a';
   // yield 'b';
    for(let i=0;i<arr.length;i++)
        yield arr[i];
}

var says = say(['hello','world']);
console.log(says.next());
console.log(says.next());
console.log(says.next());