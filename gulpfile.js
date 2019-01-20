'use strict';

var gulp = require('gulp');
var sassdoc = require('sassdoc');

// Options

var options = {
    docsInput: './resources/assets/sass/_components.scss',
    docsOutput: './components',
};

/**
 * Docs tasks
 */
const docs = function () {
    return gulp.src(options.docsInput)
        .pipe(sassdoc({
            dest: options.docsOutput,
            theme: 'boilerplate',
        }));
};

/**
 * Default task
 */
gulp.task('docs', docs);
gulp.task('default', docs);
