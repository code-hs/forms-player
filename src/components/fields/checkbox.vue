<template>
	<div
		class="field checkbox"
		:class="common.class"
		:data-v-error="valid.errorForView"
		v-bind="attrs.container"
	>
		<label>
			<!--suppress JSUnresolvedVariable -->
			<input
				ref="self"
				v-model="modelStore[common.model]"
				type="checkbox"
				:required="validation.required"
				v-bind="attrs.component"
				@change="handleChange"
			/>
			<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
			<span class="text" v-html="$t(custom.bodyHTML)" />
		</label>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/libs/validator/field-validator';
import {FieldL as FL} from '@/libs/components/field/field';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Checkbox',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({
				bodyHTML: '',
			}),
		},
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
				requiredOnlyIfVisible: false,
			}),
		},
		text: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},

	data() {
		return {
			multiBoxName: FL.getMultiName(this),
			valid: {
				error: false,
				errorForView: false,
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
			this.vProcess();
		},
		vProcess(updateStore = true) {
			if (!this.valid.connect) return;

			if (this.value) this.valid.errorForView = false;
			this.valid.error = !this.value;

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
				this.valid.errorForView = true;
			}

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
