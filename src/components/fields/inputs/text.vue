<template>
	<div class="field input-text" :class="common.class">
		<!--suppress JSUnresolvedFunction-->
		<div v-if="text.hint" class="hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedFunction, JSUnresolvedVariable-->
		<input
			ref="self"
			v-model="modelStore[common.model]"
			v-mask="mask"
			type="text"
			:inputmode="custom.inputmode"
			:placeholder="$t(text.placeholder)"
			:required="validation.required"
			:class="{error: valid.error}"
			@blur="handleBlur"
			@input="handleInput"
		/>

		<transition name="fade">
			<!--suppress JSUnresolvedFunction-->
			<div
				v-if="validation.texts.required"
				:class="{show: valid.error}"
				class="error-text"
			>
				{{ $t(validation.texts.required) }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {debounce} from '@/utils/debounce';
import {FieldValidator} from '@/libs/validator/FieldValidator';
import {InputL} from '@/libs/components/field/inputs/InputL';
import {FieldL as FH} from '@/libs/components/field/FieldL';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'InputText',
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
			multiBoxName: FH.getMultiName(this),
			valid: {
				// if field stay errored, dirty = true
				// then check field on every input, for clear error status
				dirty: false,
				// for show error text
				error: false,
				// is need validate this field
				connect: false,
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
		vHandleTask() {
			this.vProcessAndUpdateDirty(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
