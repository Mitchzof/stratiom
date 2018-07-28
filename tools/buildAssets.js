const path = require('path');

const gulp = require('gulp');

let ROOT = '../';

let dest = path.resolve(__dirname, ROOT, 'dist/public/assets');
let entry = path.resolve(__dirname, ROOT, 'src/public/assets/*');

gulp.task('build:assets', function () {
  gulp.src(entry)
    .pipe(gulp.dest(dest));
});
