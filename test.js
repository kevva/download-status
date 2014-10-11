'use strict';

var Download = require('download');
var progress = require('./');
var test = require('ava');

test('download a file with progress bar', function (t) {
	t.plan(2);

	var download = new Download()
		.get('https://github.com/imagemin/optipng-bin/archive/master.zip')
		.use(progress());

	download.run(function (err, files) {
		t.assert(!err);
		t.assert(files[0].path === 'master.zip');
	});
});
