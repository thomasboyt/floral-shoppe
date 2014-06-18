// this is what's up: https://github.com/andrewrjones/grunt-ssh
// figure out how to deploy yo shit to /home/thomas/floral-shoppe on digital ocean
// THEN figure out how to serve that off of nginx w/o breaking dokku (/home/dokku/disco.zone./nginx.conf)

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    secret: grunt.file.readJSON('secret.json'),
    sftp: {
      dist: {
        files: {
          './': 'build/**',
        },
        options: {
          path: '<%= secret.path %>',
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
          showProgress: true,
          srcBasePath: 'build/',
          createDirectories: true
        }
      }
    }
  });
};
