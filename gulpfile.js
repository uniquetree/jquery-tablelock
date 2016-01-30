'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

// 判断是开发环境还是生产环境，开发环境为true，生产环境为false
var env = true;
gulp.task('change-env', function(){
    env = false;
});

// gulp-header插件使用，利用package.json给文件添加版本说明
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// 编译scss并压缩
gulp.task('sass', function(){
    var scssSrc = 'src/sass/**/*.scss',
        cssDist = 'dist/styles';
    
    if(env){
        return gulp.src(scssSrc)
            .pipe(watch(scssSrc))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
			    cascade: false
            }))
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(gulp.dest(cssDist))
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(cssDist));
    } else {
        return gulp.src(scssSrc)
            .pipe(watch(scssSrc))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(gulp.dest(cssDist))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(cssDist));
    }
});

// 压缩js
gulp.task('js', function(){
    var jsSrc = 'src/js/**/*.js',
        jsDist = 'dist/scripts';
    
    if(env){
        return gulp.src(jsSrc)
            .pipe(watch(jsSrc))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(jshint())
            .pipe(gulp.dest(jsDist))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(jsDist));
    } else {
        return gulp.src(jsSrc)
            .pipe(watch(jsSrc))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(jshint())
            .pipe(gulp.dest(jsDist))
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(jsDist));
    }
});

gulp.task('copy:bower', function(){
    return gulp.src('./bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/libs'));
});

// 清理
gulp.task('clean', function() { 
  return gulp.src(['dist/libs', 'dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

gulp.task('dev', ['sass', 'js']);
gulp.task('release', ['change-env', 'clean', 'copy:bower', 'sass', 'js']);

gulp.task('default', ['dev']);
