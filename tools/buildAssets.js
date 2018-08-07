const path = require('path');

const gulp = require('gulp');

let ROOT = '../';

let dest = path.resolve(__dirname, ROOT, 'dist/public/assets');
let entry = path.resolve(__dirname, ROOT, 'src/public/assets/*');
let favicon = path.resolve(__dirname, ROOT, 'src/public/favicon.ico');
let faviconDest = path.resolve(__dirname, ROOT, 'dist/public');

gulp.task('favicon', () => {
  gulp.src(favicon)
    .pipe(gulp.dest(faviconDest));
});

gulp.task('assets', () => {
  gulp.src(entry)
    .pipe(gulp.dest(dest));
});

gulp.task('build:assets', ['assets', 'favicon']);
