import Vue from 'vue';
import Vuex from 'vuex';
import scheme from './scheme';
import model from './model';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {scheme, model},
});
