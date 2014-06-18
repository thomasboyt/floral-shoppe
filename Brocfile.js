/* jshint node: true */

var pickFiles = require('broccoli-static-compiler');
var uglify = require('broccoli-uglify-js');
var HBSPages = require('broccoli-pages').HBSPages;
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');

var IS_PRODUCTION = require('broccoli-env').getEnv() === 'production';

var app = pickFiles('.', {
  srcDir: '/',
  files: ['lib/**/*.js', 'src/**/*.js'],
  destDir: '/'
});

var index = pickFiles('.', {
  srcDir: '/',
  files: ['index.hbs'],
  destDir: '/'
});

index = HBSPages(index, {
  globals: {
    IS_PRODUCTION: IS_PRODUCTION
  },
  partials: null,
  helpers: null
});

var data = pickFiles('.', {
  srcDir: 'data',
  files: ['**/*'],
  destDir: 'data'
});

if ( IS_PRODUCTION ) {
  app = concat(app, {
    inputFiles: ['lib/**/*.js', 'src/**/*.js'],
    outputFile: '/vis.min.js'
  });
  app = uglify(app);
}

module.exports = mergeTrees([app, index, data]);
