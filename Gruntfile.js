module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                beautify: {
                    ascii_only: true
                }
            },
            // dist(可任意取名)
            dist: {
                files: {
                    // 輸出檔案: [要合併的檔案]
                    '<%= pkg.name %>.js': [
                        //'node_modules/moment/min/moment-with-locales.js',
                        'node_modules/validator/validator.js',
                        'src/<%= pkg.name %>.js',
                        'src/lib/*.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat'); // 合併檔案
    grunt.loadNpmTasks('grunt-contrib-uglify'); // 檔案最小化
    grunt.loadNpmTasks('grunt-mocha-test');  // unit test

    // 在 Terminal 中下指令 grunt 會執行的任務
    grunt.registerTask('default', ['concat', 'uglify']);
    // 在 Terminal 中下指令 grunt test 會執行的任務
    grunt.registerTask('test', ['concat', 'uglify', 'mochaTest']);
};