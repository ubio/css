#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const docsdir = fs.readdirSync(path.join(__dirname, 'docs'));
const jsFilenames = docsdir.filter(n => n.endsWith('.js'));

if (jsFilenames.length !== 1) {
    throw new Error('Wrong number of JS files in docs directory:', jsFilenames);
}

const demoCssFilenames = docsdir.filter(n => n.match(/demo.*\.css/));

if (demoCssFilenames.length !== 1) {
    throw new Error('Wrong number of demo CSS files in docs directory:', demoCssFilenames);
}

const indexCssFilenames = docsdir.filter(n => n.match(/index.*\.css/));

if (indexCssFilenames.length !== 1) {
    throw new Error('Wrong number of index CSS files in docs directory:', indexCssFilenames);
}

const text = fs.readFileSync(path.join(__dirname, 'src', 'demo', 'index.html'), 'utf-8');
const patched = text
    .replace('{{module}}', `./${jsFilenames[0]}`)
    .replace('{{index-css}}', `./${indexCssFilenames[0]}`)
    .replace('{{demo-css}}', `./${demoCssFilenames[0]}`);

fs.writeFileSync(path.join(__dirname, 'docs', 'index.html'), patched, 'utf-8');
