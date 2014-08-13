'use strict';

var Download = require('download');
var fs = require('fs');
var path = require('path');
var progress = require('./');
var test = require('ava');

test('download a file with progress bar', function (t) {
    t.plan(3);

    var download = new Download()
        .get('https://github.com/imagemin/optipng-bin/archive/master.zip', __dirname)
        .use(progress());

    download.run(function (err) {
        t.assert(!err);

        fs.exists(path.join(__dirname, 'master.zip'), function (e) {
            t.assert(e);

            fs.unlink(path.join(__dirname, 'master.zip'), function (err) {
                t.assert(!err);
            });
        });
    });
});
