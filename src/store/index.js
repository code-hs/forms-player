import Vue from 'vue';
import Vuex from 'vuex';
import scheme from './scheme';
import inputsModel from './inputsModel';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {scheme, inputsModel},
});
