var gulp = require('gulp');
var connect = require('gulp-connect');
gulp.task('copy-html',function(){
    gulp.src('src/a.html').pipe(gulp.dest('./dest')).pipe(connect.reload());
});
gulp.task('watch',function(){
    gulp.watch('./src/a.html',['copy-html']);
});


gulp.task('server',function(){
    connect.server({
        root:'./dest',//服务器根目录
        port:9999,//服务器端口号，没有默认是8080
        livereload:true//启动实时刷新功能
    });
});
//这个就类似于apache的文件目录一样，是服务器路径，调试ajax很方便。
gulp.task('default',['server','watch']);//执行这个任务，会在9999端口启动服务器。
