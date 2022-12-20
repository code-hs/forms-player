<template>
	<div
		class="field input-text"
		:class="common.class"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction-->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedFunction, JSUnresolvedVariable-->
		<input
			ref="self"
			v-model="modelStore[common.model]"
			v-mask="mask"
			type="text"
			:inputmode="custom.inputmode"
			:placeholder="$t(text.placeholder)"
			:required="validation.required"
			v-bind="attrs.component"
			@blur="handleBlur"
			@input="handleInput"
		/>

		<!--suppress JSUnresolvedFunction-->
		<div v-if="valid.text" class="field__error-text">
			{{ $t(valid.text) }}
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {debounce} from '@/utils/debounce';
import {FieldValidator} from '@/libs/validator/field-validator';
import {InputL} from '@/libs/components/field/inputs/input';
import {FieldL as FL} from '@/libs/components/field/field';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'InputText',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				mask: '',
				pattern: '',
				inputmode: '', // for mobile keyboard (only numbers = numeric)
			}),
		},
	},

	data() {
		return {
			mask: '',
			prevValue: '',
			multiBoxName: FL.getMultiName(this),
			valid: {
				// if field stay errored, dirty = true
				// then check field on every input, for clear error status
				dirty: false,
				// for show error text
				error: false,
				// is need validate this field
				connect: false,
				text: this.validation?.texts?.required || '',
			},
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
		InputL.initMaskDirty(this);
		this.initValidation();
	},

	beforeDestroy() {
		this.vsDestroy(this.virtualKey);
		// noinspection JSUnresolvedFunction
		bus.$off(busBroadcasts.VALIDATION_START, this.vHandleTask);
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

		initValidation() {
			if (!FieldValidator.canValidation(this.validation)) return;

			this.valid.connect = true;
			this.vsAdd(this.virtualKey);
			this.vProcessDirty = debounce(
				this.vProcessDirty,
				FieldValidator.debounceTime
			);
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleBlur() {
			this.vProcessAndUpdateDirty();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;
			// if we find problem with this, input cant update value
			// net use Vue.set(this.modelStore, this.common.model, v); as date.vue

			this.vProcessDirty();
			InputL.processTextPatternDirty(this, e);
		},
		vProcessDirty() {
			if (!this.valid.connect) return;

			// only for dirty state
			if (!this.valid.dirty) return;

			this.vUpdateError();
			this.vUpdateStore();
		},
		vProcessAndUpdateDirty(updateStore = true) {
			if (!this.valid.connect) return;

			this.vUpdateError();
			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;

			if (updateStore) this.vUpdateStore();
		},
		vUpdateError() {
			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				console.error(e);
			}
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
			// false - don't update store, because we do it in down line
			this.vProcessAndUpdateDirty(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vHandleTask() {
			if (
				this.validation.requiredOnlyIfVisible &&
				!FL.isVisible(this.$refs.self)
			) {
				this.vTaskSkip();
				return;
			}

			this.vTaskProcess();
		},
	},
};
</script>
