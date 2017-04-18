'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      appjs: {
        options: {
          jshintrc: 'jshintrc'
        },
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    clean: ['build/']

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['jshint', 'clean']);

};
