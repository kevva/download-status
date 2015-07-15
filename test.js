'use strict';
var Download = require('download');
var test = require('ava');
var downloadStatus = require('./');
var Writable = require('readable-stream').Writable;

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

test('ignore output with non-tty streams', function (t) {
	t.plan(2);

	var stream = new Writable();
	stream._write = function() {
		t.error('This function should not be called');
	};

	new Download()
		.get('https://github.com/imagemin/optipng-bin/archive/master.zip')
		.use(downloadStatus({stream: stream}))
		.run(function (err, files) {
			t.assert(!err, err);
			t.assert(files[0].path === 'master.zip', files[0].path);
		});
});

test('do not block next middleware', function (t) {
	t.plan(1);

	var called;
	new Download()
		.get('https://github.com/imagemin/optipng-bin/archive/master.zip')
		.use(downloadStatus({stream: new Writable()}))
		.use(function (res) {
			called = res;
		})
		.run(function () {
			t.assert(called !== undefined);
		});
});
