<template>
	<div
		class="field radiobutton"
		:class="classes.container"
		:data-v-error="valid.error"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
		<div v-if="text.hint" class="field__hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedVariable -->
		<div v-if="custom.options" class="inputs">
			<label v-for="(option, index) in custom.options" :key="index">
				<input
					ref="self"
					v-model="modelStore[common.model]"
					:name="inputName"
					type="radio"
					:value="option.value"
					v-bind="attrs.component"
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
import {FieldValidator} from '@/libs/validator/field-validator';
import {FieldL as FL} from '@/libs/components/field/field';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {bus, busBroadcasts} from '@/utils/bus';
import {RadiobuttonsL} from '@/libs/components/field/inputs/radiobutton';

export default {
	name: 'Radiobuttons',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				defaultValue: '',
				options: Array,
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
			classes: FL.getClasses(this),
			firstElement: null,
			multiboxName: FL.getMultiName(this),
			inputName: '',
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
		// generate random value for input tag name
		// inputs that have the same name value are grouped together
		// and need stop that behavior
		this.inputName = FL.generateNameValue(this);
		this.modelStore[this.common.model] = this.custom?.defaultValue || '';
		this.initValidation();
	},
	mounted() {
		// many inputs, auto wrapped in array
		this.firstElement = this.$refs.self[0];
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
		handleChange(e) {
			this.vProcess();
			// if scheme don't have any action on element, don't run
			RadiobuttonsL.sendAction(this.custom.options, e, this.firstElement);
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
		vTaskSkip() {
			this.vEventResponse({
				key: this.virtualKey,
				error: false,
			});
		},
		vTaskProcess() {
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
		vHandleTask() {
			if (this.validation.requiredOnlyIfVisible && !FL.isVisible(this.firstElement)) {
				this.vTaskSkip();
				return;
			}

			this.vTaskProcess();
		},
	},
};
</script>
