var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');
var del = require('del');
var connect = require('gulp-connect');

gulp.task('clean', function() {
    return del(['./dist']);
});

gulp.task('minify-html', function() {
    return gulp
        .src('./src/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
    return gulp
        .src('./src/assets/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('minify-images', function() {
    var opts = {
        progressive: true
    };

    return gulp
        .src('./src/assets/*.{png,jpg}')
        .pipe(imagemin(opts))
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('build', function() {
    runSequence(
        'clean',
        [
            'minify-html',
            'minify-css',
            'minify-images'
        ]
    )
});

gulp.task('connectDev', function() {
    connect.server({
        root: 'src',
        port: 9002
    });
});

gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 9002
    });
});
