var sourceJsFolder = 'src/js/*';
var destJsFile = 'build/packed.js';
var sourceScssFolder = 'src/scss/*.scss';
var destCssFile = 'build/packed.css';
var sourceHtmlFolder = 'src/html/*'
var destHtml = 'build/'

var htmlPath = 'src/*.html';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [sourceJsFolder],
                tasks: ['concat'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: [sourceScssFolder],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: [sourceHtmlFolder],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
        },
        concat: {
            dist: {
                src: [sourceJsFolder],
                dest: destJsFile,
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: {
                    // Key dony wanna load from variable
                    'build/packed.css': sourceScssFolder,
                }
            }
        },
        copy: {
          main: {
            files: [
              {expand: true, cwd: 'src/html/', src: ['*.html'], dest: 'build/'},
            ]
          }
        },
        browserSync: {
            bsFiles: {
                src : [
                    destCssFile,
                    destJsFile,
                    destHtml
                ]
            },
            options: {
                server: {
                    watchTask: true,
                    baseDir: "build/"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['concat', 'sass', 'copy']);
};