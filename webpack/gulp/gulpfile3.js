var gulp = require('gulp');

gulp.task('default',function(){
    gulp.src(['src/**/*.{js,css}','!src/**/*.html']).pipe(gulp.dest('dest/'));
});
