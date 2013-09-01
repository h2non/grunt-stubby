# Grunt Stubby

[![Build Status](https://travis-ci.org/h2non/grunt-stubby.png)](https://travis-ci.org/h2non/grunt-stubby)
[![Dependency Status](https://gemnasium.com/h2non/grunt-stubby.png)](https://gemnasium.com/h2non/grunt-stubby)

> A Grunt plugin for setting up a [Stubby](https://github.com/mrak/stubby4node) server based on YAML/JSON configuration files


## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-stubby --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-stubby');
```

## The "stubby" task

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  stubby: {
    stubsServer: {
      // note the array collection instead of an object
      files: [{
        src: [ 'mocks/*.{json,yaml}' ],
        basePath: 'test/'
      }]
    }
  }
})
```

#### Custom Options

```js
grunt.initConfig({
  stubby: {
    stubsServer: {
      options: {
        callback: function (server, options) {
          server.get(1, function (err, endpoint) {
            if (!err)
             console.log(endpoint);
          });
        },
        stubs: 8000,
        tls: 8443,
        admin: 8010
      },
      // note the array collection instead of an object
      files: [{
        src: [ 'mocks/*.{json,yaml}' ],
        basePath: 'test/'
      }]
    }
  }
})
```

### Options

#### options.stubs
Type: `Number`
Default value: `8882`

Port number to run the stubs portal

#### options.tls
Type: `Number`
Default value: `7443`

Port number to run the stubs portal over https

#### options.admin
Type: `Number`
Default value: `8889`

Port number to run the admin portal

#### options.data
Type: `Number`
Default value: `null`

JavaScript Object/Array containing endpoint data. 
This option will be automatically filled from the JSON/YAML config files, however you can additionally add a customized data

#### options.location
Type: `Number`
Default value: `localhost`

Address/hostname at which to run stubby

#### options.key
Type: `String`
Default value: `null`

keyfile contents (in PEM format)

#### options.cert
Type: `String`
Default value: `null`

Certificate file path contents (in PEM format)

#### options.pfx
Type: `String`
Default value: `null`

Pfx file path contents (mutually exclusive with key/cert options)

#### options.watch
Type: `String`
Default value: `null`

Filename to monitor and load as stubby's data when changes occur

#### options.mute
Type: `Boolean`
Default value: `true`

Pass in false to have console output (if available)

#### options.callback
Type: `Function`
Default value: `null`

Callback function when the server starts successfully. 
The passed arguments are:

* `server` - The Stubby server instance object
* `options` - The server config options object

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. 

Add unit tests for any new or changed functionality. 
Lint and test your code using [Grunt](http://gruntjs.com/).

### Testing

Clone the repository
```shell
$ git clone https://github.com/h2non/grunt-stubby.git && cd grunt-stubby
```

Install dependencies
```shell
$ npm install
```

Run tests
```shell
$ npm test
``` 

## Release History

* `0.1.0` 02.09.2013
  - Initial release

## TODO

You miss something? Open an issue or PR!

## License

Under [MIT](https://github.com/h2non/grunt-stubby/) license
