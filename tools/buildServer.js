const path = require('path');

const gulp = require('gulp');
const webpack = require('webpack-stream');
const config = require('./webpack/webpack.server.config.js');
const prodConfig = require('./webpack/webpack.server.prod.config.js');

let ROOT = '../';

let dest = path.resolve(__dirname, ROOT, 'dist');
let entry = path.resolve(__dirname, ROOT, 'src/server.js');

gulp.task('build:server', function () {
  return gulp.src(entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(dest));
});

gulp.task('build:server:prod', function () {
  return gulp.src(entry)
    .pipe(webpack(prodConfig))
    .pipe(gulp.dest(dest));
});
