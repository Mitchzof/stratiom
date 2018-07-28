const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');

let ROOT = '../'

let dest = path.resolve(__dirname, ROOT, 'dist/public/css');
let entry = path.resolve(__dirname, ROOT, 'src/public/scss/materialize.scss');
let watchPath = path.resolve(__dirname, ROOT, 'src/public/scss/**/*.scss');

gulp.task('build:scss', function () {
  return gulp.src(entry)
    .pipe(sass().on('error', sass.logError))
    .pipe(clean())
    .pipe(gulp.dest(dest));
});

gulp.task('watch:scss', function () {
  gulp.watch(watchPath, ['build:scss']);
});
