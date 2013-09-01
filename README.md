# Grunt Stubby

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

### Overview
In your project's Gruntfile, add a section named `stubby` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  stubby: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
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

Defaults to true. Pass in false to have console output (if available)

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. 

By default

```js
grunt.initConfig({
  stubby: {
    stubsServer: {
      files: {
        '.': [ 'testing/mocks/*.{json,yaml}' ]
      }
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
      files: {
        '.': [ 'testing/mocks/*.{json,yaml}' ]
      }
    }
  }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. 

Add unit tests for any new or changed functionality. 
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* `0.1.0` 02.09.2013
  - Initial release

## License

Under [MIT](https://github.com/h2non/grunt-stubby/) license