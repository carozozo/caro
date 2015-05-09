module.exports = function (grunt) {
    'use strict';
    var pkgName = '<%= pkg.name %>';
    var caro = pkgName + '.js';
    var srcDir = 'src/';
    var coffeeDir = 'src/coffee/';
    var jsDir = 'src/js/';
    var testDir = 'test/';
    var nodeDir = 'node_modules/';
    var banner = '/*! ' + pkgName + ' - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            oneByOne: {
                options: {
                    bare: true
                },
                files: [{
                    expand: true,
                    cwd: coffeeDir,
                    src: ['{,*/}*.coffee'],
                    //src: ['*.coffee'],
                    dest: jsDir,
                    rename: function (dest, src) {
                        return dest + '/' + src.replace(/\.coffee$/, '.js');
                    }
                }]
            },
            merge: {
                options: {
                    bare: true
                },
                files: {
                    '<%= pkg.name %>.js': [coffeeDir + pkgName + '.coffee', coffeeDir + 'lib/*.coffee']
                }
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dist: {
                files: {
                    // 輸出檔案: [要合併的檔案]
                    '<%= pkg.name %>.js': [
                        nodeDir + 'moment/min/moment-with-locales.js',
                        nodeDir + '/validator/validator.js',
                        caro
                    ]
                }
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['.js']
                }
            }
        },
        mochaTest: {
            test: {
                //options: {
                //    reporter: 'spec',
                //    captureFile: testDir + 'results.txt', // Optionally capture the reporter output to a file
                //    quiet: false, // Optionally suppress output to standard out (defaults to false)
                //    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                //},
                //src: [testDir + '*.js']
                options: {
                    reporter: 'spec',
                    require: [
                        nodeDir + 'coffee-script/register',
                        function () {
                            caro = require('./caro');
                        },
                        function () {
                            var chai = require('chai');
                            chai.should();
                        }
                    ]
                },
                src: [testDir + '*.coffee']
            }
        }
    });

    // coffee-script 轉 js
    grunt.loadNpmTasks('grunt-contrib-coffee');
    // 合併檔案
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 檔案最小化
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // unit test
    grunt.loadNpmTasks('grunt-mocha-test');

    // 套裝任務
    grunt.registerTask('default', ['coffee', 'concat']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('compileTest', ['coffee', 'concat', 'mochaTest']);
    grunt.registerTask('prod', ['coffee', 'concat', 'uglify']);
};