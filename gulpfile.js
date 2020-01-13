'use strict';

import autoprefixer from 'gulp-autoprefixer';
import { task, src, dest, watch, series } from 'gulp';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Gulp task to minify CSS files

  task('css', function () {
    return src('./src/_includes/*.scss')
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
      .pipe(rename({ suffix: ".min" }))
      // Output
      .pipe(dest('./src/_includes/css'))
  });

  
// Gulp task to minify JavaScript files
task('js', function() {
  return src("./src/_includes/assets/js/*.js")
    // Minify the file
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    // Output
    .pipe(dest("./src/_includes/assets/js"))
});


task('watch', function() {
  watch("./src/_includes/assets/styles/*.scss", series('css'));
  watch("./src/_includes/assets/js/*.js", series('js'));
});