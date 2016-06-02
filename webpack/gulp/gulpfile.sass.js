var gulp = require('gulp');
var less = require('gulp-sass');
gulp.task('sass',function(){
    gulp.src('src/sass/*.scss').pipe(less()).pipe(gulp.dest('dest/css/'));
});

gulp.task('default',['sass']);