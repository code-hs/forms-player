<template>
	<div
		class="field input-textarea"
		:class="classes.container"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction-->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedVariable JSUnresolvedFunction -->
		<textarea
			ref="self"
			v-model="modelStore[common.model]"
			:placeholder="$t(text.placeholder)"
			:rows="custom.rows"
			:required="validation.required"
			v-bind="attrs.component"
			@blur="handleBlur"
			@input="handleInput"
		>
		</textarea>

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
	name: 'InputTextarea',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				pattern: '',
				rows: 3,
			}),
		},
	},
	data() {
		return {
			classes: FL.getClasses(this.common),
			prevValue: '',
			multiboxName: FL.getMultiName(this),
			valid: {
				dirty: false,
				error: false,
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
	created() {
		this.initValidation();
	},
	beforeDestroy() {
		if (this.valid.connect) this.vsDestroy(this.virtualKey);
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
			this.vProcessDirty = debounce(this.vProcessDirty, FieldValidator.debounceTime);
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleBlur() {
			this.vProcessAndUpdateDirty();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;

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
			this.vProcessAndUpdateDirty(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vHandleTask() {
			if (this.validation.requiredOnlyIfVisible && !FL.isVisible(this.$refs.self)) {
				this.vTaskSkip();
				return;
			}

			this.vTaskProcess();
		},
	},
};
</script>
