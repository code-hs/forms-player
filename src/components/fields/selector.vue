<template>
	<div
		class="field input-selector"
		:class="classes.container"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
		<div v-if="text.label" class="field__label">{{ $t(text.label) }}</div>

		<!--suppress JSUnresolvedVariable -->
		<select
			ref="self"
			v-model="modelStore[common.model]"
			:class="classes.element"
			:required="validation.required"
			v-bind="attrs.component"
			@change="handleChange"
		>
			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<option v-if="custom.defaultText" :value="defaultLine" disabled>
				{{ $t(custom.defaultText) }}
			</option>

			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<option v-for="(optionsValue, key) in custom.options" :key="key" :value="key">
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
import {bus, busBroadcasts} from '@/libs/utils/bus';

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
				texts: {},
			}),
		},
		text: {
			type: Object,
			required: false,
			default: () => ({
				label: '',
			}),
		},
	},
	data() {
		return {
			classes: FL.getClasses(this.common),
			multiboxName: FL.getMultiName(this),
			valid: {
				error: false,
				connect: false,
				text: '',
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
		defaultLine() {
			// stay in computed, because modelStore work only here

			// if selector stay in multibox container, modelStore = {}
			// and modelStore[this.common.model] === undefined
			// if not multibox, modelStore[this.common.model] === ''
			// in multibox - value="undefined"
			// in usual field - value=""

			// for correct work default selected value need return 'undefined' or ''
			// and current selector model === 'undefined' || '' and always show default selector line
			if (this.modelStore[this.common.model] === undefined) return undefined;
			return '';
		},
	},
	created() {
		// eslint-disable-next-line vue/no-mutating-props
		this.custom.options = FL.variabling(this.custom.options);
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
			this.valid.text = FieldValidator.validate(this.validation, this.value);
			this.valid.error = !!this.valid.text;
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
			// if element is hidden
			if (FieldValidator.isSkipTaskByOptionsReqOnlyIfVis(this.validation, this.$refs.self)) {
				this.vTaskSkip();
				return;
			}

			this.vTaskProcess();
		},
	},
};
</script>
