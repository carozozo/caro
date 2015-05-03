module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            // dist(可任意取名)
            dist: {
                files: {
                    // 輸出檔案: [要合併的檔案]
                    '<%= pkg.name %>.js': ['src/<%= pkg.name %>.js', 'lib/*.js']
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
        nodeunit: {
            all: ['test/test.js'],
            options: {
                reporter: 'junit',
                reporterOptions: {
                    output: 'unit_test_report'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat'); // 合併檔案
    grunt.loadNpmTasks('grunt-contrib-uglify'); // 檔案最小化
    grunt.loadNpmTasks('grunt-contrib-nodeunit'); // unit test

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']); // 在 Terminal 中下指令 grunt 會執行的任務
    grunt.registerTask('test', ['concat', 'uglify','nodeunit']); // 在 Terminal 中下指令 grunt 會執行的任務
};