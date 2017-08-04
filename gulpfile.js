'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pump = require('pump');
var rename = require('gulp-rename');

gulp.task('sass', function(cb) {
	pump([gulp.src('sass/*.scss'),
		sass().on('error', sass.logError),
		rename('style.css'),
		gulp.dest('css/')
	], cb);
});

gulp.task('default', function() {
	gulp.watch('sass/*.scss', ['sass']);
});