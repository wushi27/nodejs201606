'use strict';
function say(arr){

    let i=0;
    return {
        next(){//es6的简写。
            return {value:arr[i++],
                    done:i>=arr.length
            };
        }
    };
}
let says = say(['hello','world']);
console.log(says.next());//{value:'hello',done:false}
console.log(says.next());//{value:'world',done:false}
console.log(says.next());//{value:undefined,done:true}