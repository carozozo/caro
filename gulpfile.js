(function () {
  // 清除檔案
  var del = require('del');
  // task 管理
  var gulp = require('gulp');
  // coffee-script 轉 js
  var gCoffee = require('gulp-coffee');
  // 合併檔案
  var gConcat = require('gulp-concat');
  // 在檔案內加入標頭
  var gHeader = require('gulp-header');
  // 檔案重新命名
  var gRename = require('gulp-rename');
  // 檔案最小化
  var gUglify = require('gulp-uglify-es').default;
  // Unit Test
  var gMocha = require('gulp-mocha');

  var pkg = require('./package.json');
  var pkgName = pkg.name;
  var pkgVersion = pkg.version;

  var srcDir = './src/';
  var coffeeDir = srcDir + 'coffee/';
  var jsDir = srcDir + 'js/';
  var distDir = './dist/';
  var testDir = './test/';

  var mainFile = pkgName + '.js';
  var mainFilePath = distDir + mainFile;

  gulp.task('cleanJs', function () {
    return del([jsDir]);
  });

  gulp.task('cleanDist', function () {
    return del([distDir]);
  });

  gulp.task('coffee', ['cleanJs'], function () {
    return gulp.src([coffeeDir + '*.coffee', coffeeDir + 'lib/*.coffee'], {base: coffeeDir})
      .pipe(gCoffee({bare: true}).on('error', function () {
        console.error('gulp-coffee error')
      }))
      .pipe(gulp.dest(jsDir));
  });

  gulp.task('concat', ['cleanDist', 'coffee'], function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = year + '-' + month + '-' + day;
    var head = '/*! ' + pkgName + ' - v' + pkgVersion + '- ' + today + ' */\r\n';
    return gulp.src([jsDir + '*.js', jsDir + 'lib/*.js'])
      .pipe(gConcat(mainFile))
      .pipe(gulp.dest(distDir))
      .pipe(gHeader(head))
      .pipe(gulp.dest(distDir))
  });

  gulp.task('compress', ['concat'], function () {
    return gulp.src(mainFilePath)
      .pipe(gRename({suffix: '.min'}))
      .pipe(gUglify())
      .pipe(gulp.dest(distDir));
  });

  gulp.task('test', ['concat'], function () {
    return gulp.src(testDir + '*.coffee', {read: false})
      .pipe(gMocha({
        compilers: 'coffee:coffee-script/register'
      }));
  });

  gulp.task('default', ['compress', 'test']);
})();