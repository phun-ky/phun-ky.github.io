var gulp = require('gulp');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var notifier = require('node-notifier');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('less', function () {
    return gulp
        .src('assets/src/less/main.less')
        .pipe( sourcemaps.init() )
        .pipe(less())
        .on('error', function(error){

          gutil
            .log(gutil.colors.bgRed.bold.white(' LESS: Error: ') + gutil.colors.bgRed.white("'" + error.plugin + "'") + ' : '+ gutil.colors.red(error.message));

          notifier
            .notify({
              title: 'Gulp Error: ' + error.plugin,
              message: error.message,
            }, function (err, response) {
              // response is response from notification
            });
        })
        .pipe( sourcemaps.write())
        
        .pipe( rename( 'ph-style.css' ) )
        .pipe(gulp.dest('assets/css/dist/'));
});


gulp.task('watch-less', ['less'], function() {
  var watcher = gulp.watch('assets/src/less/**/*.less', ['less']);
  watcher.on('change', function(event) {

    console.log('asds');

    gutil.log('File '+gutil.colors.yellow(event.type)+': ' + gutil.colors.magenta(event.path));
    gutil.log('Rebuilding CSS core file');

    notifier.notify({
      title: 'watch-less: File ' + event.type,
      message: event.path,
    }, function (err, response) {
      // response is response from notification
    });
  });
});


gulp.task('default', ['watch-less']);
  