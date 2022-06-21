import Vue from 'vue';
import Vuex from 'vuex';

// scheme functional
import scheme from './scheme';

// model for inputs, generated structure based on the page structure
import model from './model';

// validate inputs
import validator from './validator';

// validate inputs
import request from './request';

// current lang
import localization from './localization';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {scheme, model, validator, request, localization},
});
