var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var bowerFiles = require('gulp-bower-files');

// 压缩js
gulp.task('uglify', function(){
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
    gulp.src('bower_components/**/dist/*.min.js')
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', []);
