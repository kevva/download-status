'use strict';

var objectAssign = require('object-assign');
var chalk = require('chalk');
var lpadAlign = require('lpad-align');
var Progress = require('progress');

module.exports = function (opts) {
	return function (res, url, cb) {
		opts = opts || {};
		opts.stream = opts.stream || process.stderr;
		opts.indent = opts.indent || 2;

		if (res.headers['content-length']) {
			var words = [
				'fetch',
				'progress'
			];

			var fetch = chalk.cyan(lpadAlign('fetch', words, opts.indent));
			var progress = chalk.cyan(lpadAlign('progress', words, opts.indent));
			var str = progress + ' : [:bar] :percent :etas';

			var bar = new Progress(str, objectAssign({
				complete: '=',
				incomplete: ' ',
				width: 20,
				total: parseInt(res.headers['content-length'], 10)
			}, opts));

			opts.stream.write(fetch + ' : ' + url + '\n');

			res.on('data', function (data) {
				bar.tick(data.length);
			});

			res.on('end', function () {
				opts.stream.write('\n');
				cb();
			});
		}
	};
};
