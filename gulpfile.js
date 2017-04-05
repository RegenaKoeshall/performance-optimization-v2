"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  minifyCss = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
     del = require('del');


gulp.task('minifyCss', function(){
    return gulp.src( 'css/foundation.css')
        .pipe(maps.init())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(rename('styles.min.css'))
        .pipe(maps.write('./'))
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


gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});


gulp.task('watchFiles', function() {
	gulp.watch('css/*.css', ['minifyCss']);
	gulp.watch('js/*.js', ['minifyScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/styles.min.css', 'css/styles.min.css.map', 'js/app*.js*']);
});

gulp.task("build", ['clean', 'minifyScripts', 'minifyCss'], function() {
  return gulp.src(["css/styles.min.css", "js/app.min.js", 'index.html',
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});


gulp.task("default", ["build"]);
