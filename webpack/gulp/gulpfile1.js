var gulp = require('gulp');
//拷贝文件任务
gulp.task('default',function(){
    gulp.src('src/a.html').pipe(gulp.dest('dest/'));
});
