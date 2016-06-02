var gulp = require('gulp');

gulp.task('default',function(){
    gulp.src('src/**/*.{js,html}').pipe(gulp.dest('dest/'));
});
