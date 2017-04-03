"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
     del = require('del');


gulp.task('concatCss', function() {
	return gulp.src('css/foundation.css')
	.pipe(gulp.dest('css'));
});

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/fastclick.js',
        'js/foudation.equalizer.js',
        'js/foundation.js',
        'js/foundation.reveal.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyCss', ['concatCss'], function() {
	return gulp.src('css/foundation.css')
	.pipe(uglify())
	.pipe(rename(style.min.css))
	.pipe(gulp.dest('css'));

});
gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});


gulp.task('watchFiles', function() {
	gulp.watch('css/foundation.css', ['minifyCss']);
	gulp.watch('js/*.js', ['minifyScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/foundation.css', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts'], function() {
  return gulp.src(["css/foundation.css", "js/app.min.js", 'index.html',
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});


gulp.task("default", ["build"]);
