const state = () => ({
	commandValidateFields: false,
	hasError: false,
	inputsCount: 0,
	validatedInputsCount: 0,
	focusActive: false,
});

const getters = {
	commandValidateFields: s => s.commandValidateFields,
	focusActive: s => s.focusActive,
	hasError: s => s.hasError,
	inputsCount: s => s.inputsCount,
	ifCheckDone: s => {
		if (s.validatedInputsCount === s.inputsCount) {
			s.commandValidateFields = false;
			return true;
		}
		return false;
	},
};

const mutations = {
	startCommandValidate: s => {
		s.hasError = false;
		s.validatedInputsCount = 0;
		s.commandValidateFields = true;
		s.focusActive = false;
	},

	setValidateStatus: (s, v) => {
		s.validatedInputsCount++;

		if (s.hasError) return;
		s.hasError = v;
	},
	subscribeInput: s => {
		s.inputsCount++;
	},
	setFocusActive: s => {
		s.focusActive = true;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
