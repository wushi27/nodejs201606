var gulp = require('gulp');
//依赖hello模块。
gulp.task('default',['hello'],function(){
    console.log('world');
});
gulp.task('hello',function(){
    console.log('hello');
});
