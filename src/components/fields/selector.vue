<template>
	<div
		class="field input-selector"
		:class="common.class"
		:data-v-error="valid.error"
		v-bind="attrs"
	>
		<!--suppress JSUnresolvedFunction -->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<select
			ref="self"
			v-model="modelStore[common.model]"
			:required="validation.required"
			@change="handleChange"
		>
			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<option v-if="custom.defaultText" value="" disabled>
				{{ $t(custom.defaultText) }}
			</option>

			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<option
				v-for="(optionsValue, key) in custom.options"
				:key="key"
				:value="key"
			>
				{{ $t(optionsValue) }}
			</option>
		</select>

		<!--suppress JSUnresolvedFunction -->
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

export default {
	name: 'Selector',
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
				options: {},
				defaultText: '',
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
		// eslint-disable-next-line vue/no-mutating-props
		this.custom.options = FH.variabling(this.custom.options);
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
			if (!FieldValidator.canValidation(this.validation, true)) return;

			this.valid.connect = true;
			this.vsAdd(this.virtualKey);
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
		},
		handleChange() {
			this.vProcess(true);
		},
		vProcess(updateStore = true) {
			if (!this.valid.connect) return;

			this.vUpdateError();
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
