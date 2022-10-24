import vueCustomElement from 'vue-custom-element';
import Vue from 'vue';
import VueMask from 'v-mask';
import App from './app';
import store from './store';
import {Localization} from './plugins/localization';

// add dev log functions
import('./utils/console');

App.store = store;
// (optional) 'Custom elements polyfill'
// import 'document-register-element/build/document-register-element';
Vue.use(vueCustomElement);
Vue.config.productionTip = false;
Vue.use(Localization);
Vue.use(VueMask);

// noinspection JSUnresolvedFunction
Vue.customElement('form-widget-g', App);
