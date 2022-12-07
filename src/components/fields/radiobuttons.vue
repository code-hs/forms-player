<template>
	<div
		ref="self"
		class="field radiobutton"
		:class="common.class"
		:data-v-error="valid.error"
		v-bind="attrs"
	>
		<!--suppress JSUnresolvedFunction -->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedVariable -->
		<div v-if="custom.options" class="inputs">
			<label v-for="(option, index) in custom.options" :key="index">
				<input
					v-model="modelStore[common.model]"
					:name="modelStore[common.model]"
					type="radio"
					:value="option.value"
					@change="handleChange"
				/>
				<!--suppress JSUnresolvedFunction -->
				<span class="inputs__text">{{ $t(option.text) }}</span>
			</label>
		</div>

		<!--suppress JSUnresolvedFunction-->
		<div v-if="valid.text" class="field__error-text">
			{{ $t(valid.text) }}
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/libs/validator/FieldValidator';
import {FieldL as FH} from '@/libs/components/field/field';
import {bus, busBroadcasts} from '@/utils/bus';
import {RadiobuttonL} from '@/libs/components/field/inputs/radiobutton';

export default {
	name: 'Radiobuttons',
	props: {
		common: FH.common,
		attrs: FH.attrs,
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
				defaultValue: '',
				options: Array,
			}),
		},
	},

	data() {
		return {
			multiBoxName: FH.getMultiName(this),
			valid: {
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
		this.initValidation();
		this.modelStore[this.common.model] = this.custom?.defaultValue || '';
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
			if (!FieldValidator.canValidation(this.validation, true)) return;

			this.valid.connect = true;
			this.vsAdd(this.virtualKey);
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleChange(e) {
			this.vProcess();
			RadiobuttonL.processActions(this.custom.options, e, this.$refs.self);
		},
		vProcess(updateStore = true) {
			if (!this.valid.connect) return;
			if (this.value) this.valid.error = false;

			if (updateStore) this.vUpdateStore();
		},
		vUpdateStore() {
			this.vsUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		vHandleTask() {
			// after click submit, if empty value -> show error border
			if (!this.value) {
				this.valid.error = true;
			}

			// false - don't update store, because we do it in down line
			this.vProcess(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
