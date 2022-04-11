import vueCustomElement from 'vue-custom-element';
import Vue from 'vue';
import App from './app.vue';
import store from './store';
import {shadowRootInit} from './utils/initDom';
import {Localization} from './plugins/localization';

// add dev log functions
require('./utils/console');

App.store = store;
// (optional) 'Custom elements polyfill'
// import 'document-register-element/build/document-register-element';
Vue.use(vueCustomElement);
Vue.config.productionTip = false;
Vue.use(Localization);

const options = {
	shadow: true,
	beforeCreateVueInstance: root => {
		shadowRootInit(root);
	},
};
Vue.customElement('form-widget-g', App, options);
