'use strict';

const filepaths = process.argv.slice(2);

if (!filepaths.length) {
    console.error('No file to rename given.');
    process.exit(1);
}

const fs = require('fs');
const path = require('path');

for (const filepath of filepaths) {
    if (!fs.existsSync(filepath)) {
        console.error('File not found. PWD:', process.cwd(), 'path given:', filepath);
        process.exit(1);
    }

    const hash = require('crypto')
        .createHash('md5')
        .update(fs.readFileSync(filepath))
        .digest('hex')
        .slice(0, 8);

    const [base, ext] = path.basename(filepath).split('.');
    const newpath = path.join(path.dirname(filepath), `${base}-${hash}${ext ? `.${ext}` : ''}`);

    console.log('Renaming', filepath, 'to', newpath);

    fs.renameSync(filepath, newpath);
}

