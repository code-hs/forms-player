<template>
	<div
		class="field input-date"
		:class="common.class"
		:data-v-error="valid.error"
		v-bind="attrs"
	>
		<!--suppress JSUnresolvedFunction-->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedFunction JSUnresolvedVariable-->
		<input
			ref="self"
			v-model="modelStore[common.model]"
			v-mask="mask"
			type="text"
			:placeholder="$t(text.placeholder)"
			:required="validation.required"
			@blur="handleBlur"
			@input="handleInput"
		/>

		<!--suppress JSUnresolvedVariable-->
		<div v-if="valid.text" class="field__error-text">
			{{ valid.text }}
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/libs/validator/FieldValidator';
import {InputL} from '@/libs/components/field/inputs/InputL';
import {FieldL as FH} from '@/libs/components/field/FieldL';
import {ModuleController} from '@/libs/modules/ModuleController';
import {bus, busBroadcasts} from '@/utils/bus';
import {DatepickerLoader} from '@/libs/modules/datepicker/DatepickerLoader';
import {DatepickerL} from '@/libs/modules/datepicker/DatepickerL';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {debounce} from '@/utils/debounce';

export default {
	name: 'InputDate',
	props: {
		common: FH.common,
		attrs: FH.attrs,
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
				texts: {
					required: '',
					notValid: '',
					range: '',
				},
			}),
		},
		virtualKey: FH.virtualKey,
		multiboxIndex: FH.multiboxIndex,
		text: FH.text,
		html: FH.html,
		styles: FH.styles,
		custom: {
			type: Object,
			required: true,
			default: () => ({
				mask: '', // required
			}),
		},
		module: {
			type: Object,
			required: false,
			default: () => ({
				minDate: '',
				maxDate: '',
			}),
		},
	},

	data() {
		const moduleConfig = ModuleController.getModuleConfig('datepicker');
		// union all options for field
		const moduleFieldOptions = {...moduleConfig.forEachField, ...this.module};

		return {
			mask: '',
			multiBoxName: FH.getMultiName(this),
			valid: {
				error: false,
				text: this.$t(this.validation?.texts?.required),
			},
			moduleData: {
				config: moduleConfig,
				fieldOptions: moduleFieldOptions,
			},
			datepickerItem: null,
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			lang: 'localization/currentLanguage',
		}),
		modelStore() {
			if (this.multiBoxName) {
				// if multibox is parent of this field, use multibox name and index
				return this.modelStructure[this.multiBoxName][this.multiboxIndex];
			}
			return this.modelStructure;
		},
		value() {
			return this.modelStore[this.common.model];
		},
	},

	watch: {
		lang() {
			if (!this.datepickerItem) return;

			this.datepickerItem.destroy();
			this.setCorrectLang();
			this.initDatepicker();
		},
	},

	created() {
		DatepickerL.validateFieldParams(this);
		InputL.initMaskDirty(this);
		this.initValidation();
	},

	async mounted() {
		// wait when all loaded
		try {
			await this.waitDatepicker();
			this.initDatepicker();
		} catch (e) {
			console.error(e);
		}
	},

	beforeDestroy() {
		this.vsDestroy(this.virtualKey);
		// noinspection JSUnresolvedFunction
		bus.$off(busBroadcasts.VALIDATION_START, this.vHandleTask);

		if (this.datepickerItem) {
			this.datepickerItem.destroy();
		}
	},

	methods: {
		//! v - validator, s - store
		...mapMutations({
			vsAdd: 'validator/add',
			vsUpdate: 'validator/update',
			vsDestroy: 'validator/destroy',
		}),
		...mapActions({
			vEventResponse: 'validator/fieldResponse',
		}),
		async waitDatepicker() {
			const smtt = SmartTimeout.createForLoadFile();
			const datepickerLoader = new DatepickerLoader(
				this.moduleData.config,
				this.lang
			);

			await ModuleController.waitWhenLoaded(
				() => datepickerLoader.getModule(),
				smtt
			);
			await datepickerLoader.waitLocales();
			this.setCorrectLang();
		},
		setCorrectLang() {
			this.moduleData.fieldOptions.language = DatepickerL.getNormalizedLanguage(
				this.moduleData.config,
				this.lang
			);
		},
		initDatepicker() {
			// after loaded module and locales for datepicker
			const {self} = this.$refs;
			const {Datepicker} = window;

			this.datepickerItem = new Datepicker(self, this.moduleData.fieldOptions);
			self.addEventListener('changeDate', this.changeDate);
		},
		setValue(v) {
			// update value, only by Vue.set, not by set value.
			// Need create reactive value for multiBox functional
			Vue.set(this.modelStore, this.common.model, v);
			// this.modelStructure[this.multiBoxName][this.multiboxIndex],
		},
		changeDate() {
			// when user change date in datepicker
			const v = this.$refs.self.value;
			this.setValue(v);
			this.vProcess();
		},
		initValidation() {
			this.vsAdd(this.virtualKey);
			this.vProcessDebounced = debounce(
				this.vProcess,
				FieldValidator.debounceTime
			);

			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleBlur() {
			this.vProcess();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.setValue(e.target.value);
			// this.modelStore[this.common.model] = e.target.value;
			this.vProcessDebounced();
		},
		isFieldFulled() {
			return this.custom.mask.length === this.value.length;
		},
		vProcess(updateStore = true) {
			const errorTextKey = this.vGetErrorText();

			if (errorTextKey) {
				this.valid.error = true;
				this.valid.text = this.$t(errorTextKey);
			} else {
				this.valid.error = false;
			}

			if (updateStore) this.vUpdateStore();
		},
		vGetErrorText() {
			try {
				const isValid = FieldValidator.isValid(this.validation, this.value);
				if (!isValid) {
					// Can't find error text, ' ' - fix for show error,
					return this.validation.texts.required || ' ';
				}
			} catch (e) {
				// bad scheme validation options
				console.error(e);
			}
			if (!this.isFieldFulled()) return;

			try {
				// noinspection JSCheckFunctionSignatures
				DatepickerL.processValidate(
					this.moduleData?.fieldOptions,
					this.validation,
					this.value
				);
			} catch (e) {
				return e.message || ' ';
			}
		},
		vUpdateStore() {
			this.vsUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vHandleTask() {
			this.vProcess(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
