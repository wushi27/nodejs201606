import {name,getName} from './people.js';//每个导出
import {age} from './student.js';//多个导出
import defaults from './default.js';//默认导出
getName('test');
console.log(age);
defaults('xiaoming',123);

