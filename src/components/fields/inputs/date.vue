<template>
	<div class="field input-date" :class="common.class">
		<div v-if="text.hint" class="hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedFunction -->
		<input
			ref="self"
			v-model="modelStore[common.model]"
			v-mask="mask"
			type="text"
			:placeholder="$t(text.placeholder)"
			:required="validation.required"
			class="datepicker-1"
			:class="{error: valid.error}"
			@blur="handleBlur"
			@input="handleInput"
		/>

		<transition name="fade">
			<div
				v-if="valid.text"
				:class="{showContent: valid.error}"
				class="error-text"
			>
				{{ valid.text }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {InputHelper} from '@/classes/components/field/inputs/InputHelper';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';
import {ModuleController} from '@/classes/modules/ModuleController';
import {bus, busBroadcasts} from '@/utils/bus';
import {DatepickerLoader} from '@/classes/modules/datepicker/DatepickerLoader';
import {DatepickerHelper} from '@/classes/modules/datepicker/DatepickerHelper';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {debounce} from '@/utils/debounce';

export default {
	name: 'InputDate',
	props: {
		common: FH.common,
		validation: {
			type: Object,
			required: false,
			default: () => ({
				errorTextRequired: '',
				errorTextNotValid: '',
				errorTextRange: '',
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
		const moduleFieldOptions = {...moduleConfig.forEachField, ...this.module};

		return {
			mask: '',
			multiBoxName: FH.getMultiName(this),
			valid: {
				error: false,
				connect: false,
				text: this.$t(this.validation.errorTextRequired),
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
		if (!this.custom.mask) {
			throw new Error('InputDate: custom.mask is required');
		}

		InputHelper.initMaskDirty(this);
		this.initValidation();
	},

	async mounted() {
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
		bus.$off(busBroadcasts.VALIDATION_START, this.validatorHandleTask);

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
			fieldResponseOnValidationEvent: 'validator/fieldResponse',
		}),
		async waitDatepicker() {
			const smtt = SmartTimeout.createForLoadFile();
			const datepickerLoader = new DatepickerLoader(
				this.moduleData.config,
				this.lang
			);

			await ModuleController.waitWhenLoaded(() => window.Datepicker, smtt);
			await datepickerLoader.waitLocales(datepickerLoader);
			this.setCorrectLang();
		},
		setCorrectLang() {
			this.moduleData.fieldOptions.language =
				DatepickerHelper.getNormalizedLanguage(
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
		changeDate() {
			this.modelStore[this.common.model] = this.$refs.self.value;
		},
		initValidation() {
			// noinspection JSCheckFunctionSignatures
			if (!FieldValidator.canValidation(this.validation)) return;

			// запуск валидации происходит если есть regexp, или required
			this.valid.connect = true;
			this.vsAdd(this.virtualKey);
			this.vProcess = debounce(this.vProcess, FieldValidator.debounceTime);

			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleBlur() {
			this.vProcess();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;
			this.vProcess();
		},
		isFieldFulled() {
			return this.custom.mask.length === this.value.length;
		},
		vProcess(updateStore = true) {
			if (!this.valid.connect) return;

			const errorText = this.vUpdateError();
			if (errorText) {
				this.valid.error = true;
				this.valid.text = this.$t(errorText);
			}

			if (updateStore) this.vUpdateStore();
		},
		vUpdateError() {
			try {
				// noinspection JSCheckFunctionSignatures
				const isValid = FieldValidator.isValid(this.validation, this.value);
				if (!isValid) return this.validation.errorTextRequired;
			} catch (e) {
				// bad scheme validation options
				console.error(e);
			}
			if (!this.isFieldFulled()) return;

			try {
				DatepickerHelper.processValidate(
					this.moduleData?.fieldOptions,
					this.value,
					this.validation
				);
			} catch (e) {
				return e.message;
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
			this.fieldResponseOnValidationEvent({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
