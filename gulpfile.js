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
gulp.task('docs', function () {
    return gulp.src(options.docsInput)
        .pipe(sassdoc({
            dest: options.docsOutput,
            theme: 'boilerplate',
        }));
});

/**
 * Default task
 */
gulp.task('default', ['docs']);
