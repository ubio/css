import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonJS from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';

const extensions = ['.js', '.vue', '.json'];
const isProduction = !process.env.ROLLUP_WATCH;

const plugins = [
    resolve({
        extensions
    }),
    commonJS(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    vue({
        template: {
            isProduction,
            compilerOptions: {
                whitespace: 'condense'
            }
        },
        css: false
    }),
    buble()
];

export default {
    plugins,
    input: './src/index.js',
    output: {
        file: 'docs/build/app.js',
        format: 'umd'
    },
    watch: {
        include: 'src/**'
    }
};
