'use strict';

module.exports = function(config) {

  config.initConfig({

    clean: ['build/'],

    copy: {
      copyhtml: {
        files: [
          {
            cwd: 'client/',
            src: '*.html',
            dest: 'build/',
            expand: true
          },
          {
            cwd: 'client/templates/',
            src: '*.template.html',
            dest: 'build/templates/',
            expand: true
          }
        ]
      },
      copyjs: {
        files: [
          {
            cwd: 'client/js/',
            src: '*.js',
            dest: 'build/js/',
            expand: true
          }
        ]
      }
    },

    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    sass: {
      all: {
        files: {
          'build/style.css':'client/sass/main.scss'
        }
      }
    }
  });

  require('load-grunt-tasks')(config);

  config.registerTask('build', ['jshint', 'clean', 'copy', 'sass']);

};
