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
				v-if="validation.errorText"
				:class="{showContent: valid.error}"
				class="error-text"
			>
				{{ $t(validation.errorText) }}
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
import {DatepickerH} from '@/classes/modules/DatepickerH';
import {SmartTimeout} from '@/utils/SmartTimeout';

export default {
	name: 'InputDate',
	props: {
		common: FH.common,
		validation: FH.validation,
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
			default: () => ({}),
		},
	},

	data() {
		return {
			mask: '',
			multiBoxName: FH.getMultiName(this),
			valid: {
				dirty: false,
				error: false,
				connect: false,
			},
			moduleConfig: ModuleController.getModuleOptions('datepicker'),
			lang: this.localization.getLang(),
			datepickerItem: null,
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
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

	created() {
		InputHelper.initMaskDirty(this);
	},

	mounted() {
		ModuleController.init(() => window.Datepicker, this.init);
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

		init() {
			const smtt = new SmartTimeout(50, SmartTimeout.coefficients.loadingFile);
			const datepickerH = new DatepickerH(this.moduleConfig, this.lang);
			datepickerH.setLangInOptions(); // dirty function, update this.moduleConfig
			let runOnce = true;

			const tickerFunc = () => {
				// Функция для ожидания загрузки локалей.
				// После каждого тика, время увеличивается вдвое
				setTimeout(() => {
					if (datepickerH.isLoadedLocales()) {
						this.initAfterLoadedLocales();
						return; // stop loop
					}

					if (runOnce && smtt.totalTime > 900) {
						// если не удалось загрузить локали в течении 900мс,
						// то выводим уже с дефолтным языком окно
						runOnce = false;
						this.initAfterLoadedLocales();
						// не завершаем цикл, вдруг еще дозагрузиться локали
						// continue loop
					}

					if (smtt.totalTime > 10000) {
						// Но если вдруг они не загрузятся и за это время,
						// то отменяем ожидание.
						// А если бы загрузились, то выполнилась бы функция
						// 	if (datepickerH.isLoadedLocales()) this.initAfterLoadedLocales();
						return; // stop loop
					}

					// new tick in loop
					tickerFunc();
				}, +smtt);
			};
			tickerFunc();
		},

		initAfterLoadedLocales() {
			// after loaded module and locales for datepicker
			const {self} = this.$refs;
			const opts = {...this.moduleConfig.global, ...this.module};
			const {Datepicker} = window;

			this.datepickerItem = new Datepicker(self, opts);
			self.addEventListener('changeDate', this.updateValue);
		},

		updateValue() {
			this.modelStore[this.common.model] = this.$refs.self.value;
			this.validatorProcessAndUpdateDirty();
		},

		initValidation() {
			if (FieldValidator.canValidation(this.validation)) {
				// запуск валидации происходит если есть regexp, или required
				this.valid.connect = true;
				this.validatorAdd(this.virtualKey);

				// noinspection JSUnresolvedFunction
				// bus.$on(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
			}
		},
		handleBlur() {
			// this.validatorProcessAndUpdateDirty();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;
			console.log(e.target.value);

			// this.validatorProcessDirty();
		},
		validatorProcessAndUpdateDirty(updateStore = true) {
			if (!this.valid.connect) return;

			this.validatorUpdateError();
			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;

			console.log(this.valid);
			if (updateStore) this.validatorSaveInfo();
		},
		validatorUpdateError() {
			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
		},
		// validatorProcessDirty() {
		// 	if (!this.valid.connect) return;
		//
		// 	// only for dirty state
		// 	if (!this.valid.dirty) return;
		//
		// 	this.validatorUpdateError();
		// 	this.validatorSaveInfo();
		// },

		validatorSaveInfo() {
			this.validatorUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		// validatorHandleTask() {
		// 	this.validatorProcessAndUpdateDirty(false);
		// 	this.fieldResponseOnValidationEvent({
		// 		key: this.virtualKey,
		// 		error: this.valid.error,
		// 	});
		// },
	},
};
</script>
