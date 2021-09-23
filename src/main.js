import vueCustomElement from 'vue-custom-element';
import Vue from 'vue';
import App from './App.vue';
import store from './store';

App.store = store;
// (optional) 'Custom elements polyfill'
// import 'document-register-element/build/document-register-element';
Vue.use(vueCustomElement);
Vue.config.productionTip = false;

const options = {
	shadow: true,
	beforeCreateVueInstance(root) {
		// for working shadow
		const rootNode = root.el.getRootNode();

		if (rootNode instanceof ShadowRoot) {
			// console.debug('shadowRoot found! Using as root node ');
			root.shadowRoot = rootNode;
		} else {
			// console.debug('shadowRoot not found! Using document head ');
			root.shadowRoot = document.head;
		}

		return root;
	},
};

Vue.customElement('form-widget-g', App, options);
