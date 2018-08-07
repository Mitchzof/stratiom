const path = require('path');

const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./tools', {recurse: false});

gulp.task('default', ['build:client', 'build:server', 'watch:scss', 'watch:scripts']);

gulp.task('build', ['build:client', 'build:server', 'build:scss', 'build:scripts', 'build:assets']);

gulp.task('prod', ['build:client:prod', 'build:server:prod', 'build:scss', 'build:scripts']);

gulp.task('testnet', ['build:client:testnet', 'build:server:testnet', 'build:scss', 'build:scripts']);
