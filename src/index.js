import Vue from 'vue';
import App from './demo/index.vue';
import Spec from './demo/spec.vue';

Vue.component('spec', Spec);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        colors: ['mono', 'cool', 'warm', 'yellow', 'blue', 'brand-blue', 'red', 'brand-red', 'green'],
        colorsGrey: ['mono', 'cool', 'warm'],
        colorsSemaphore: ['blue', 'yellow', 'red', 'green'],
        colorsBrand: ['brand-blue', 'brand-red'],
        darkMode: false
    },
    render: h => h(App)
});
