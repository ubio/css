'use strict';

const path = require('path');
const postcss = require('postcss');
const atImport = require('postcss-import');

module.exports = {
    customCompilers: {
        css(content, cb, compiler) {
            const resolve = (id, basedir) => {
                // console.log('resolve', id, basedir);
                const file = path.resolve(basedir, id);
                compiler.emit('dependency', file);
                return file;
            };
            postcss()
                .use(atImport({ resolve }))
                .process(content, {
                    from: path.resolve(__dirname, 'package.json')
                })
                .then(result => {
                    // console.log(result);
                    cb(null, result.css);
                }, err => cb(err));
        }
    }
};
