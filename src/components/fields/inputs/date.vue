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
import {DatepickerLoader} from '@/classes/modules/DatepickerLoader';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {debounce} from '@/utils/debounce';
import {parseDate} from '@/utils/dateparser';

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
		const moduleConfig = ModuleController.getModuleOptions('datepicker');
		const moduleFieldOptions = {...moduleConfig.global, ...this.module};

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

			console.log('update lang');
			this.datepickerItem.destroy();
			// datepickerLoader.setLangInOptions(this.moduleData.fieldOptions);
			// this.initDatepicker();
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
		this.validatorDestroy(this.virtualKey);
		// noinspection JSUnresolvedFunction
		bus.$off(busBroadcasts.VALIDATION_START, this.validatorHandleTask);

		if (this.datepickerItem) {
			this.datepickerItem.destroy();
		}
	},

	methods: {
		...mapMutations({
			validatorAdd: 'validator/add',
			validatorUpdate: 'validator/update',
			validatorDestroy: 'validator/destroy',
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
			// dirty function, update this.mergedOptions
			datepickerLoader.setLangInOptions(this.moduleData.fieldOptions);

			await ModuleController.waitWhenLoaded(() => window.Datepicker, smtt);
			await datepickerLoader.waitLocales(datepickerLoader);
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
			this.validatorAdd(this.virtualKey);
			this.validatorProcess = debounce(
				this.validatorProcess,
				FieldValidator.debounceTime
			);

			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
		},
		handleBlur() {
			this.validatorProcess();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;
			this.validatorProcess();
		},
		isFieldFulled() {
			return this.custom.mask.length === this.value.length;
		},
		validatorProcess(updateStore = true) {
			if (!this.valid.connect) return;

			this.validatorUpdateError();
			if (updateStore) this.validatorSaveInfo();
		},
		validatorUpdateError() {
			try {
				// noinspection JSCheckFunctionSignatures
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
				if (this.valid.error) {
					this.valid.text = this.$t(this.validation.errorTextRequired);
					return;
				}
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}

			if (!this.isFieldFulled()) return;

			// T - Timestamp
			let inputValueT;
			try {
				inputValueT = parseDate(
					this.value,
					this.moduleData.fieldOptions.format
				);
			} catch {
				this.valid.error = true;
				this.valid.text = this.$t(this.validation.errorTextNotValid);
				return;
			}

			let minDateT;
			let maxDateT;

			try {
				minDateT = parseDate(
					this.moduleData.fieldOptions.minDate,
					this.moduleData.fieldOptions.format
				);
				maxDateT = parseDate(
					this.moduleData.fieldOptions.maxDate,
					this.moduleData.fieldOptions.format
				);
			} catch {
				throw new Error(
					'Datepicker: is not valid minDate or maxDate in field scheme'
				);
			}

			if (inputValueT < minDateT || inputValueT > maxDateT) {
				this.valid.error = true;
				this.valid.text = this.$t(this.validation.errorTextRange);
			} else {
				this.valid.error = false;
			}
		},

		validatorSaveInfo() {
			this.validatorUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		validatorHandleTask() {
			this.validatorProcess(false);
			this.fieldResponseOnValidationEvent({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
