var gulp = require('gulp');
var less = require('gulp-less');
gulp.task('default',function(){
    gulp.src('src/less/*.less').pipe(less()).pipe(gulp.dest('dest/css/'));
});
