'use strict';

var assign = require('object-assign');
var ProgressBar = require('progress');

/**
 * Progress bar download plugin
 *
 * @param {Object} res
 * @api public
 */

module.exports = function (opts) {
    return function (res) {
        var len = parseInt(res.headers['content-length'], 10);
        var bar = new ProgressBar('  downloading [:bar] :percent :etas', assign({
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        }, opts || {}));

        res.on('data', function (data) {
            bar.tick(data.length);
        });

        res.on('end', function () {
            console.log('\n');
        });
    };
};
