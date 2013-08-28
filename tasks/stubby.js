/*
 * grunt-stubby
 * https://github.com/h2non/grunt-stubby
 *
 * Copyright (c) 2013 Tomas Aparicio
 * Licensed under the MIT license.
 */

'use strict';

var Stubby = require('stubby').Stubby;

module.exports = function (grunt) {
  var _ = grunt.util._;

  grunt.registerMultiTask('stubby', 'A Grunt plugin for configuring on-the-fly Stubby server based on YAML/JSON files', function () {
    var stubbyServer = new Stubby();
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      basePath: '.',
      callback: null, // takes one parameter: the error message (if there is one), undefined otherwise
      server: {
        stubs: 8882, // port number to run the stubs portal
        admin: 8889, // port number to run the admin portal
        tls: 7443, // port number to run the stubs portal over https
        data: null, // JavaScript Object/Array containing endpoint data
        location: 'localhost', // address/hostname at which to run stubby
        key: null, // keyfile contents (in PEM format)
        cert: null, // certificate file contents (in PEM format)
        pfx: null, // pfx file contents (mutually exclusive with key/cert options)
        watch: null, // filename to monitor and load as stubby's data when changes occur,
        mute: true // defaults to true. Pass in false to have console output (if available),
      }
    });

    // Iterate over all specified file groups.
    var data = _.union.apply(_, this.files.map(function (f) {
      // Concat specified files.
      var mocks = _.union.apply(_, f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      }).map(function (filepath) {
        var data;
        // Read file source.
        // TODO: get base path for 
        if (/.json$/g.test(filepath)) {
          data = grunt.file.readJSON(filepath);
        } else {
          data = grunt.file.readYAML(filepath);
        }

        if (!_.isArray(data)) {
          data = [ data ];
        }

        return data;
      }));

      return mocks;
    }));

    options.server.data = data;

    // start stubby server
    stubbyServer.start(options.server, function (error) {
      if (error) {
        grunt.log.warn('Stubby starting error: "' + error);
        return;
      }

      if (_.isFunction(options.callback)) {
        options.callback(options);
      }

      grunt.log.writeln('Stubs HTTP server listening on port ' + options.server.stubs);
      grunt.log.writeln('Stubs HTTPS server listening on port ' + options.server.tls);
      grunt.log.writeln('Admin server listening on port ' + options.server.admin);

      setTimeout(done, 20000);

    });

  });

};