const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      webpack = require('webpack'),
      webpackConfig = require('./webpack.config'),
      uglifyCss = require('gulp-uglifycss')
 
    

gulp.task('sass', function(){
   return gulp.src('./src/styles/**/*.scss')
              .pipe(sass()
              .on('error', sass.logError))           
              .pipe(gulp.dest('./temp/styles'))
              .pipe(browserSync.stream())
    })


// gulp.task('scripts', function(){
//      webpack()
// })




// watch all Sass files 
// and run the sass task whenever a Sass file is saved
gulp.task('watch', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    },
  })

  gulp.watch('./*.html', browserSync.reload)
  gulp.watch('./src/styles/**/*.scss', ['sass'])
  gulp.watch('./src/scripts/**/*.js', browserSync.reload)
}) 
