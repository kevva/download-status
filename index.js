'use strict';

var assign = require('object-assign');
var chalk = require('chalk');
var ProgressBar = require('progress');

/**
 * Progress bar download plugin
 *
 * @param {Object} res
 * @api public
 */

module.exports = function (opts) {
    return function (res, file, cb) {
        opts = opts || { info: 'cyan' };

        var msg = chalk[opts.info]('  downloading') + ' : ' + file.url;
        var info = chalk[opts.info]('     progress') + ' : [:bar] :percent :etas';
        var len = parseInt(res.headers['content-length'], 10);

        var bar = new ProgressBar(info, assign({
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        }, opts));

        console.log(msg);

        res.on('data', function (data) {
            bar.tick(data.length);
        });

        res.on('end', function () {
            console.log('\n');
            cb();
        });
    };
};
