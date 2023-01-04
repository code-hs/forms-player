<template>
	<div
		class="field input-selector"
		:class="common.class"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedVariable -->
		<select
			ref="self"
			v-model="modelStore[common.model]"
			:required="validation.required"
			v-bind="attrs.component"
			@change="handleChange"
		>
			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<option v-if="custom.defaultText" :value="defaultValue" disabled>
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
import {FieldValidator} from '@/libs/validator/field-validator';
import {FieldL as FL} from '@/libs/components/field/field';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Selector',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				options: {},
				defaultText: '',
			}),
		},
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
				requiredOnlyIfVisible: false,
				texts: {},
			}),
		},
		text: {
			type: Object,
			required: false,
			default: () => ({
				hint: '',
			}),
		},
	},
	data() {
		return {
			multiboxName: FL.getMultiName(this),
			defaultValue: '',
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
		// get correct default value
		// if selector stay in multibox, field hasn't default value like ''
		// and default value is undefined
		// if it is not multibox, field has default value like ''
		// defaultValue using for set default text in select
		this.defaultValue = `${this.modelStore[this.common.model]}`;

		// eslint-disable-next-line vue/no-mutating-props
		this.custom.options = FL.variabling(this.custom.options);
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
		vTaskSkip() {
			this.vEventResponse({
				key: this.virtualKey,
				error: false,
			});
		},
		vTaskProcess() {
			// false - don't update store, because we do it in down line
			this.vProcess(false);
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
