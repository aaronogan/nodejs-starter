var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var yarn = require('gulp-yarn');

gulp.task('clean', function(callback) {
  return del('./dist', callback);
});

gulp.task('yarn', function() {
  return gulp.src(['./package.json', './yarn.lock'])
    .pipe(gulp.dest('./dist'))
    .pipe(yarn());
});

gulp.task('ts', function() {
  return gulp.src(['./src/**/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest('./dist'));
});

gulp.task('default', function(callback) {
  return runSequence([
    'clean', 'yarn', 'ts'
  ], callback);
});
