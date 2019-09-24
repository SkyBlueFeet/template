'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-cssmin');
const salad = require('postcss-salad');
const source = require('./config/global').alias.source;
const staticDir = require('./config/global').alias.static;

const outputDir = `${staticDir}/layout`;
const inputFile = `${source}/*.css`;

gulp.task('compile', function() {
    return gulp.src('app/static/source/**/*.css')
        .pipe(postcss([salad({
            'browsers': [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 9',
                '>0.5%'
            ],
            'features': {
                'bem': {
                    'shortcuts': {
                        'component': 'b',
                        'modifier': 'm',
                        'descendent': 'e',
                        'component-namespace': 'name'
                    },
                    'separators': {
                        'descendent': '__',
                        'modifier': '--'
                    }
                }
            }
        })]))
        .pipe(gulp.dest(outputDir));
});


gulp.task('build', ['compile']);
gulp.task('watch', function() {
    gulp.watch('app/static/source/**/*.css', ['compile']);
});