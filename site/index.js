'use strict';

const Vue = require('vue');
Vue.component('spec', require('./demo/spec.vue'));

const App = Vue.component('app', require('./demo/index.vue'));

new App({
    el: '#app',
    data: {
        colors: ['mono', 'cool', 'warm', 'yellow', 'blue', 'brand-blue', 'red', 'brand-red', 'green'],
        colorsGrey: ['mono', 'cool', 'warm'],
        colorsSemaphore: ['blue', 'yellow', 'red', 'green'],
        colorsBrand: ['brand-blue', 'brand-red']
    }
});
