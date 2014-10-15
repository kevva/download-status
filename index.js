'use strict';

var assign = require('object-assign');
var chalk = require('chalk');
var ProgressBar = require('progress');

/**
 * Progress bar download plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	return function (res, url, cb) {
		opts = opts || { info: 'cyan' };
		opts.stream = opts.stream || process.stderr;

		if (res.headers['content-length']) {
			var msg = chalk[opts.info]('  downloading') + ' : ' + url;
			var info = chalk[opts.info]('     progress') + ' : [:bar] :percent :etas';
			var len = parseInt(res.headers['content-length'], 10);

			var bar = new ProgressBar(info, assign({
				complete: '=',
				incomplete: ' ',
				width: 20,
				total: len
			}, opts));

			opts.stream.write(msg);

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
