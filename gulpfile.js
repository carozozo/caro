(function () {
  // 清除檔案
  var del = require('del')
  // task 管理
  var gulp = require('gulp')
  // 合併檔案
  var gConcat = require('gulp-concat')
  // 在檔案內加入標頭
  var gHeader = require('gulp-header')
  // 檔案重新命名
  var gRename = require('gulp-rename')
  // 檔案最小化
  var gUglify = require('gulp-uglify-es').default
  // Unit Test
  var gMocha = require('gulp-mocha')

  var pkg = require('./package.json')
  var pkgName = pkg.name
  var pkgVersion = pkg.version

  var srcDir = './src/'
  var distDir = './dist/'
  var testDir = './test/'

  var mainFile = pkgName + '.js'
  var mainFilePath = distDir + mainFile

  var cleanDist = function () {
    return del([distDir])
  }
  var concat = function () {
    cleanDist()
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    var today = year + '-' + month + '-' + day
    var head = '/*! ' + pkgName + ' - v' + pkgVersion + '- ' + today + ' */\r\n'
    return gulp.src([srcDir + '*.js', srcDir + 'lib/*.js'])
      .pipe(gConcat(mainFile))
      .pipe(gulp.dest(distDir))
      .pipe(gHeader(head))
      .pipe(gulp.dest(distDir))
  }
  var compress = function () {
    concat()
    return gulp.src(mainFilePath)
      .pipe(gRename({suffix: '.min'}))
      .pipe(gUglify())
      .pipe(gulp.dest(distDir))
  }
  var test = function () {
    concat()
    return gulp.src(testDir + '*.js', {read: false})
      .pipe(gMocha())
  }
  var def = function (cb) {
    compress()
    test()
    cb()
  }

  gulp.task('cleanDist', cleanDist)
  gulp.task('concat', concat)
  gulp.task('compress', compress)
  gulp.task('test', test)
  gulp.task('default', def)
})()