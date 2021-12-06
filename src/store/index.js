import Vue from 'vue';
import Vuex from 'vuex';

// схема, и все необходимое с ней
import scheme from './scheme';

// модель для инпутов, генерируется на основании схемы
import model from './model';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {scheme, model},
});
