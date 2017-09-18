var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {

  return gulp.src('partials/styles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .on('error', function(errorInfo) {
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('temp'));

});

var gulp = require('gulp'),
watch = require('gulp-watch'),
connect = require('gulp-connect-php'),
browserSync = require('browser-sync').create();



gulp.task('watch', function() {

    // browserSync.init({
    //   notify: false,
    //   server:{
    //     baseDir:'./angel_hernandez_m/'
    //   }
    // });

    var files = [
      './temp/styles.css',
      './*.php'
    ];

    browserSync.init(files, {
		proxy: "http://angelhernandez:8888/",
		notify: false
	});


    gulp.task('connect', function() {
        connect.server();
    });



    gulp.watch('*.php').on('change', function () {
      browserSync.reload();
    });

    watch('partials/**/*.css', function () {

      gulp.start('cssInject');

    });

});






gulp.task('cssInject', ['styles'], function() {
   return gulp.src('styles.css')
   .pipe(browserSync.stream());
});
