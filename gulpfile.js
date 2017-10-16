var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var src = {
  html: './src/*.html',
  js: './src/js/**/*.js',
  sass: './src/sass/*.scss'
}

var dist = {
  html: './dist/',
  js: './dist/script.js',
  sass: './dist/'
}

// sass task
gulp.task('sass', function() {
  return gulp.src(src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist.sass));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// watching for html and sass
gulp.task('watch', function() {
  gulp.watch(src.html, ['copy-html']).on('change', browserSync.reload);
  gulp.watch(src.sass, ['sass']).on('change', browserSync.reload);

});

gulp.task('copy-html', function() {
  return gulp.src(src.html)
    .pipe(gulp.dest(dist.html))
})

gulp.task('default', ['browser-sync','copy-html', 'sass', 'watch']);
gulp.task('build', ['copy-html', 'sass'])
