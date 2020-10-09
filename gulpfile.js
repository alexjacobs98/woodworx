const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

//compile scss into css
function style() {
    return gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./assets/styles/'))
    .pipe(browserSync.stream());
}


function minify() {
  return gulp.src('./assets/styles/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/styles'));
}


function watch() {
    browserSync.init({
        server: {
           baseDir: "../WoodWorx",
           index: "./index.html"
        }
    });
    gulp.watch('./assets/scss/*.scss', style)
    gulp.watch('./assets/scss/partials/*.scss', style)
    gulp.watch('./assets/styles/*.css', minify)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./assets/js').on('change', browserSync.reload);
    gulp.watch('./dist/styles/*.css').on('change', browserSync.reload)
}

exports.watch = watch;
exports.style = style;
exports.minify = minify;
