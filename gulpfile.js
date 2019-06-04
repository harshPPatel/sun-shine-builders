var gulp          = require('gulp'),
    htmlmin       = require('gulp-htmlmin'),
    cleanCSS      = require('gulp-clean-css'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    imagemin      = require('gulp-imagemin'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    browserSync   = require('browser-sync'),
    pug           = require('gulp-pug');

var htmlDestination = 'build/',
    pugSource = 'source/pug/*.pug',
    cssVendorSource = 'source/css/*.css',
    sassSource = 'source/sass/**/*.sass',
    cssDestination = 'build/assets/css/',
    jsVendorSource = 'source/js/vendors/*.js',
    jsAppSource = 'source/js/*.js',
    jsDestination = 'build/assets/js/',
    jsonSource = 'source/js/json/*.json',
    jsonDestination = 'build/assets/js/json/',
    imgSource = 'source/img/*',
    imgDestination = 'build/assets/img/',
    faviconSource = 'source/favicon/*',
    faviconDestination = 'build/assets/favicon/';

//pug Task
gulp.task('pug', function() {
  return gulp.src(pugSource)
    .pipe(pug())
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    }))
    .pipe(gulp.dest(htmlDestination));
})

//Minify Vendor Css and Concat them
gulp.task('minify-css', () => {
  return gulp.src(cssVendorSource)
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ["cover 99.5%"]
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(cssDestination));
})

//sass
gulp.task('sass', function() {
  return gulp.src(sassSource)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ["cover 99.5%"]
    }))
    .pipe(gulp.dest(cssDestination))
})

//vendor js
gulp.task('vendorjs', function (cb) {
  pump([
      gulp.src(jsVendorSource),
      plumber(),
      concat('vendors.js'),
      uglify(),
      gulp.dest(jsDestination)
    ],
    cb
  );
});

// JSON task
gulp.task('json', function() {
  gulp.src(jsonSource)
    .pipe(gulp.dest(jsonDestination));
});

//app js
gulp.task('appjs', function (cb) {
  pump([
      gulp.src(jsAppSource),
      plumber(),
      concat('app.js'),
      uglify(),
      gulp.dest(jsDestination)
      ],
    cb
  );
});

//image minify
gulp.task('img-minify', () => {
  gulp.src(imgSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(imgDestination));
})

//favicon minify
gulp.task('favicon', () => {
  gulp.src(faviconSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(faviconDestination));
})

//watch task
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  gulp.watch(pugSource, ['pug']);
  gulp.watch(cssVendorSource, ['minify-css']);
  gulp.watch(jsVendorSource, ['vendorjs']);
  gulp.watch(jsAppSource, ['appjs']);
  gulp.watch(jsonSource, ['json']);
  gulp.watch(imgSource, ['img-minify']);
  gulp.watch(faviconSource, ['favicon']);
  gulp.watch(sassSource, ['sass']);
  gulp.watch([
    'build/*.html',
    'build/assets/css/*.css',
    'build/assets/js/*.js',
    'build/assets/js/json/*.json',
    'build/assets/img/*',
    'build/assets/favicon/*',
  ]).on('change', browserSync.reload);
})

// Gulp Default Task
gulp.task('default', ['pug', 'minify-css', 'json',  'vendorjs', 'appjs', 'img-minify', 'favicon', 'sass', 'watch']);