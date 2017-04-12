'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var sourcemaps = require('gulp-sourcemaps');
var browsersync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

// Options

var options = {
    autoprefixer: [
        'Android >= 4.4',
        'last 3 Chrome versions',
        'last 3 Firefox versions',
        'Explorer >= 11',
        'iOS >= 9',
        'Safari >= 10'
    ],

    sassInput: './css/styles.scss',
    sassOutput: './css',

    docsInput: './css/*.scss',

    sassCompiler: {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },

    browserSync: {
        server: {
            baseDir: "./"
        }
    }
};

// Tasks

/**
 * Compiles scss files, autoprefixes, and writes sourcemaps
 */
gulp.task('sass', function () {
    return gulp.src(options.sassInput)
        .pipe(sourcemaps.init())
        .pipe(sass(options.sassCompiler).on('error', sass.logError))
        .pipe(autoprefixer(options.autoprefixer))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.sassOutput))
        .pipe(browsersync.reload({stream: true}));
});

/**
 * Cleans scss files with csscomb
 */
gulp.task('clean', function () {
    return gulp.src('./css/**/*.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('./css/'));
});

/**
 * Runs all necessary build tasks
 */
gulp.task('build', ['sass']);

/**
 * Watches files and builds on events
 */
gulp.task('watch', ['build'], function () {
    gulp.watch("./css/**/*.scss", ['build']);
});

/**
 * Watches files and starts a browsersync server
 */
gulp.task('serve', ['watch'], function () {
    browsersync.init(options.browserSync);

    gulp.watch([
        "./components/**/*",
        "./*.html",
        "./js/**/*.js",
        "./img/**/*"
    ]).on('change', browsersync.reload);
});

/**
 * Docs tasks
 */
gulp.task('docs', function () {
    return gulp.src(options.docsInput)
        .pipe(sassdoc({
            theme: 'boilerplate',
        }));
});

/**
 * Default task
 */
gulp.task('default', ['build']);
