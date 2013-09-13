/*
 * grunt-stubby
 * https://github.com/h2non/grunt-stubby
 *
 * Copyright (c) 2013 Tomas Aparicio
 * Licensed under the MIT license.
 */

'use strict';

var Stubby = require('stubby').Stubby;
var path = require('path');

module.exports = function (grunt) {
  var _ = grunt.util._;

  // defines the absolute path for external static request/response
  // files that will be processed internally by Stubby
  function setPathStaticFiles(array) {
    array = array.map(function (object) {
      if (_.isObject(object.request) && object.request.file) {
        object.request.file = object.request.file;
      }
      if (_.isObject(object.response)) {
        // support collections for responses
        if (_.isArray(object.response)) {
          object.response = object.response.map(function (response) {
            if (response.file) {
              response.file = response.file;
            }
            return response;
          });
        } else {
          if (object.response.file) {
            object.response.file = object.response.file;
          }
        }
      }

      return object;
    });

    return array;
  }

  function getAbsolutePath(filepath) {
    if (!grunt.file.isPathAbsolute(filepath)) {
      filepath = process.cwd() + '/' + filepath;
    }
    return filepath;
  }

  grunt.registerMultiTask('stubby', 'A Grunt plugin for setting up a Stubby server based on YAML/JSON configuration files', function () {
    var stubbyServer = new Stubby();
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      callback: null, // takes one parameter: the error message (if there is one), undefined otherwise
      stubs: 8882, // port number to run the stubs portal
      admin: 8889, // port number to run the admin portal
      tls: 7443, // port number to run the stubs portal over https
      data: null, // JavaScript Object/Array containing endpoint data
      location: 'localhost', // address/hostname at which to run stubby
      key: null, // keyfile contents (in PEM format)
      cert: null, // certificate file contents (in PEM format)
      pfx: null, // pfx file contents (mutually exclusive with key/cert options)
      watch: null, // filename to monitor and load as stubby's data when changes occur
      mute: true // defaults to true. Pass in false to have console output (if available)
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
        filepath = getAbsolutePath(filepath);
        // Read file source.
        if (/.yaml$/g.test(filepath)) {
          data = grunt.file.readYAML(filepath);
        } else if (/.js$/g.test(filepath)) {
          try {
            data = require(filepath);
          } catch (e) {
            grunt.fail.fatal('Error while parsing JS file "' + filepath + '"', 1);
          }
        } else {
          data = grunt.file.readJSON(filepath);
        }

        if (!_.isArray(data)) {
          data = [ data ];
        }

        return setPathStaticFiles(data);
      }));

      return mocks;
    }));

    if (_.isObject(options.data)) {
      if (_.isArray(options.data)) {
        options.data = _.union(options.data, data);
      } else {
        options.data = data.push(options.data);
      }
    } else {
      options.data = data;
    }

    // start stubby server
    stubbyServer.start(_.omit(options, 'callback'), function (error) {
      if (error) {
        grunt.log.error('Stubby error: "' + error);
        done();
        return;
      }

      if (_.isFunction(options.callback)) {
        options.callback(stubbyServer, options);
      }

      grunt.log.writeln('Stubby HTTP server listening on port ' + options.stubs);
      grunt.log.writeln('Stubby HTTPS server listening on port ' + options.tls);
      grunt.log.writeln('Admin server listening on port ' + options.admin);

      done();

    });

  });

};