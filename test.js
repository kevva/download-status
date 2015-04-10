'use strict';

var Download = require('download');
var test = require('ava');
var downloadStatus = require('./');

test('download a file with progress bar', function (t) {
	t.plan(2);

	new Download()
		.get('https://github.com/imagemin/optipng-bin/archive/master.zip')
		.use(downloadStatus())
		.run(function (err, files) {
			t.assert(!err, err);
			t.assert(files[0].path === 'master.zip', files[0].path);
		});
});
