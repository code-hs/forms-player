import Vue from 'vue';
import Vuex from 'vuex';

// scheme functional
import scheme from './scheme';

// model for inputs, generated structure based on the schema
import model from './model';

// validate inputs
import validator from './validator';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {scheme, model, validator},
});
