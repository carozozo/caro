module.exports = function (grunt) {
    var pkgName = '<%= pkg.name %>';
    var pkgFile = pkgName + '.js';
    var coffeeDir = 'coffee/';
    var jsDir = 'js/';
    var testDir = 'test/';
    var nodeDir = 'node_modules/';
    var banner = '/*! ' + pkgName + ' - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\r\n';

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
        uglify: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': [pkgFile]
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: [
                        nodeDir + 'coffee-script/register',
                        function () {
                            global.caro = require('./caro');
                        },
                        function () {
                            var chai = require('chai');
                            global.should = chai.should();
                        }
                    ]
                },
                src: [testDir + '*.coffee']
            }
        }
    });

    // coffee-script 轉 js
    grunt.loadNpmTasks('grunt-contrib-coffee');
    // 檔案最小化
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // unit test
    grunt.loadNpmTasks('grunt-mocha-test');

    // 套裝任務
    grunt.registerTask('default', ['coffee', 'uglify', 'test']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('compileTest', ['coffee', 'mochaTest']);
};