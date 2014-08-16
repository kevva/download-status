# download-status [![Build Status](https://travis-ci.org/kevva/download-status.svg?branch=master)](https://travis-ci.org/kevva/download-status)

> Progress bar plugin for download

![](https://cloud.githubusercontent.com/assets/709159/3942877/5c8112b0-257c-11e4-9f4a-0fa2a0187b04.png)

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
