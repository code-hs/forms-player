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
		const moduleOptions = ModuleController.getModuleOptions('datepicker');
		const mergedOptions = {...moduleOptions.global, ...this.module};

		return {
			mask: '',
			multiBoxName: FH.getMultiName(this),
			valid: {
				error: false,
				connect: false,
				text: this.$t(this.validation.errorTextRequired),
			},
			moduleOptions,
			mergedOptions,
			datepickerItem: null,
			dateFull: false,
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
			if (this.datepickerItem) {
				this.datepickerItem.destroy();
				this.loadLocales();
			}
		},
	},

	created() {
		if (!this.custom.mask) {
			throw new Error('InputDate: custom.mask is required');
		}

		InputHelper.initMaskDirty(this);
		this.initValidation();
	},

	mounted() {
		const smtt = SmartTimeout.createForLoadFile();
		ModuleController.init(
			() => window.Datepicker,
			this.loadLocales,
			null,
			smtt
		);
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

		loadLocales() {
			const smtt = SmartTimeout.createForLoadFile();
			let runOnce = true;
			const datepickerLoader = new DatepickerLoader(
				this.moduleOptions,
				this.lang
			);
			datepickerLoader.setLangInOptions(this.mergedOptions);
			// dirty function, update this.mergedOptions

			// wait when locales will be loaded
			const loop = () => {
				if (datepickerLoader.isLoadedLocales()) {
					// main function, wait when loaded locales
					this.initAfterLoadedLocales();
					return; // stop loop
				}

				if (runOnce && smtt.totalTime > 900) {
					// if locales not loaded after 900ms -> use default module lang 'en'
					runOnce = false;
					this.initAfterLoadedLocales();
					// don't stop loop, wait, maybe loaded locales, need bigger time for that
					// continue loop
				}

				if (smtt.totalTime > 10000) {
					console.error('Datepicker: locales not loaded, use default lang');
					// if locales not loaded after 10000ms
					return; // stop loop, stop waiting is locales load
				}

				setTimeout(loop, +smtt);
			};
			setTimeout(loop, +smtt);
		},

		initAfterLoadedLocales() {
			// after loaded module and locales for datepicker
			const {self} = this.$refs;
			const {Datepicker} = window;

			this.datepickerItem = new Datepicker(self, this.mergedOptions);
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
				inputValueT = parseDate(this.value, this.mergedOptions.format);
			} catch {
				this.valid.error = true;
				this.valid.text = this.$t(this.validation.errorTextNotValid);
				return;
			}

			let minDateT;
			let maxDateT;

			try {
				minDateT = parseDate(this.module.minDate, this.mergedOptions.format);
				maxDateT = parseDate(this.module.maxDate, this.mergedOptions.format);
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
