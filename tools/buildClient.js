const path = require('path');

const gulp = require('gulp');
const webpack = require('webpack-stream');
const config = require('./webpack/webpack.client.config.js');
const prodConfig = require('./webpack/webpack.client.prod.config.js');
const testnetConfig = require('./webpack/webpack.client.testnet.config.js');

let ROOT = '../';

let dest = path.resolve(__dirname, ROOT, 'dist');
let entry = path.resolve(__dirname, ROOT, 'src/client/client.js');

gulp.task('build:client', function () {
  return gulp.src(entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(dest));
});

gulp.task('build:client:prod', function () {
  return gulp.src(entry)
    .pipe(webpack(prodConfig))
    .pipe(gulp.dest(dest));
});

gulp.task('build:client:testnet', function () {
  return gulp.src(entry)
    .pipe(webpack(testnetConfig))
    .pipe(gulp.dest(dest));
});
