<template>
	<div
		class="field radiobutton"
		:class="common.class"
		:data-v-error="valid.error"
	>
		<!--suppress JSUnresolvedFunction -->
		<div v-if="text.hint" class="hint">{{ $t(text.hint) }}</div>

		<div class="inputs">
			<label>
				<input
					v-model="modelStore[common.model]"
					type="radio"
					name="t1"
					value="yes"
					@change="handleChange"
				/>
				<span class="text">Yes</span>
			</label>

			<label>
				<input
					v-model="modelStore[common.model]"
					type="radio"
					name="t1"
					value="no"
					@change="handleChange"
				/>
				<span class="text">No</span>
			</label>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/libs/validator/FieldValidator';
import {FieldL as FH} from '@/libs/components/field/FieldL';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Radiobuttons',
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
			default: () => ({}),
		},
	},

	data() {
		return {
			multiBoxName: FH.getMultiName(this),
			valid: {
				error: false,
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
			if (!this.valid.connect) return;
			if (this.value) this.valid.error = false;
			this.vUpdateStore();
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

			this.handleChange(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
