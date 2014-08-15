# download-status [![Build Status](https://travis-ci.org/kevva/download-status.svg?branch=master)](https://travis-ci.org/kevva/download-status)

> Progress bar plugin for download

## Install

```bash
$ npm install --save download-status
```

## Usage

```js
var Download = require('download');
var progress = require('download-status');

var download = new Download({ extract: true, strip: 1 })
    .get('http://example.com/file.zip', 'destFolder')
    .use(progress());

download.run(function (err) {
    if (err) {
        throw err;
    }

    console.log('Download finished!');
});
```

## API

### progress(opts)

Pass in [options](https://github.com/visionmedia/node-progress#options) to customize 
the look of the progress bar.

## License

MIT © [Kevin Mårtensson](http://kevinmartensson.com)
