const path = require('path');

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

let ROOT = '../'

let dest = path.resolve(__dirname, ROOT, 'dist/public/js');
let watchPath = path.resolve(__dirname, ROOT, 'src/assets/scripts/**/*.js');

gulp.task('build:scripts', function () {
  return gulp.src(watchPath)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

gulp.task('watch:scripts', function () {
  gulp.watch(watchPath, ['build:scripts']);
});
