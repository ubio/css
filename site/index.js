'use strict';

const Vue = require('vue');

const App = Vue.component('app', require('./app.vue'));

new App({
    el: '#app',
});
