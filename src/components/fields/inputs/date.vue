<template>
	<div
		class="field input-date"
		:class="classes.container"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction-->
		<div v-if="text.label" class="field__label">
			{{ $t(text.label) }}
			<span class="--hint">{{ $t(custom.hint) }}</span>
		</div>

		<!--suppress JSUnresolvedFunction JSUnresolvedVariable-->
		<input
			ref="self"
			v-model="modelStore[common.model]"
			v-mask="mask"
			type="text"
			:class="classes.element"
			:placeholder="$t(text.placeholder)"
			:required="validation.required"
			v-bind="attrs.component"
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
import {FieldValidator} from '@/libs/validator/field-validator';
import {FieldL as FL} from '@/libs/components/field/field';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {ModuleController} from '@/libs/modules/module-controller';
import {bus, busBroadcasts} from '@/libs/utils/bus';
import {DatepickerLoader} from '@/libs/modules/datepicker/datepicker-loader';
import {DatepickerL} from '@/libs/modules/datepicker/datepicker';
import {SmartTimeout} from '@/utils/smart-timeout';
import {debounce} from '@/utils/debounce';

export default {
	name: 'InputDate',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				mask: '', // required
				hint: '',
				workTogether: {
					selfIdentify: '',
					purposeModel: '',
					validateText: '',
				},
			}),
		},
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
	},
	data() {
		const moduleConfig = ModuleController.getConfig('datepicker');
		// union all options for field
		const moduleFieldOptions = {...moduleConfig.forEachField, ...this.module};

		return {
			classes: FL.getClasses(this.common),
			mask: DatepickerL.getMask(this.custom.mask),
			multiboxName: FL.getMultiName(this),
			valid: {
				error: false,
				connect: false,
				text: this.$t(this.validation?.texts?.required),
			},
			moduleData: {
				isEnable: ModuleController.isEnable('datepicker'),
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
			if (this.multiboxName) {
				// if multibox is parent of this field, use multibox name and index
				return this.modelStructure[this.multiboxName][this.multiboxIndex];
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
		this.initValidation();
	},
	async mounted() {
		if (!this.moduleData.isEnable) return;

		// wait when all loaded
		try {
			await this.waitDatepicker();
			this.initDatepicker();
		} catch (e) {
			console.error(e);
		}
	},
	beforeDestroy() {
		if (this.valid.connect) this.vsDestroy(this.virtualKey);
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
			const datepickerLoader = new DatepickerLoader(this.moduleData.config, this.lang);

			await ModuleController.waitWhenLoaded(() => datepickerLoader.getModule(), smtt);
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
			// this.modelStructure[this.multiboxName][this.multiboxIndex],
		},
		changeDate() {
			// when user change date in datepicker
			const v = this.$refs.self.value;
			this.setValue(v);
			this.vProcess();
		},
		initValidation() {
			if (!FieldValidator.canValidation(this.validation, true)) return;

			this.valid.connect = true;

			this.vsAdd(this.virtualKey);
			this.vProcessDebounced = debounce(this.vProcess, FieldValidator.debounceTime);

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
			return this.mask.length === this.value.length;
		},
		async vProcess(updateStore = true) {
			const errorTextKey = await this.vGetErrorText();

			if (errorTextKey) {
				this.valid.error = true;
				this.valid.text = this.$t(errorTextKey);
			} else {
				this.valid.error = false;
			}

			if (updateStore) this.vUpdateStore();
		},
		async vGetErrorText() {
			try {
				const isValid = FieldValidator.isValid(this.validation, this.value);
				if (!isValid) {
					// Can't find error text, ' ' - fix for show error,
					// because empty string not show error, need some text, invisible space.
					return this.validation.texts.required || ' ';
				}
			} catch (e) {
				// bad scheme validation options
				console.error(e);
			}
			if (!this.isFieldFulled()) return;

			try {
				// noinspection JSCheckFunctionSignatures
				await DatepickerL.processValidate(
					this.moduleData?.fieldOptions,
					this.validation,
					this.value,
					this
				);
			} catch (e) {
				return e.message || ' ';
			}

			return false;
		},
		vUpdateStore() {
			this.vsUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vTaskSkip() {
			this.vEventResponse({
				key: this.virtualKey,
				error: false,
			});
		},
		vTaskProcess() {
			this.vProcess(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vHandleTask() {
			if (FieldValidator.isSkipTaskByOptionsReqOnlyIfVis(this.validation, this.$refs.self)) {
				this.vTaskSkip();
				return;
			}

			this.vTaskProcess();
		},
	},
};
</script>
