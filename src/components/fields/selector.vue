<template>
	<div class="field input-selector" :class="common.class">
		<!--suppress JSUnresolvedFunction -->
		<div v-if="text.hint" class="hint">{{ $t(text.hint) }}</div>

		<select
			ref="self"
			v-model="modelStore[common.model]"
			required
			:class="{error: valid.error}"
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

		<transition name="fade">
			<!--suppress JSUnresolvedFunction -->
			<div
				v-if="validation.texts.required"
				v-show="valid.error"
				class="error-text"
			>
				{{ $t(validation.texts.required) }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Selector',
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
			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.vsAdd(this.virtualKey);

				// noinspection JSUnresolvedFunction
				bus.$on(busBroadcasts.VALIDATION_START, this.vHandleTask);
			}
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
				// eslint-disable-next-line no-console
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
			this.vProcess(false);
			this.vEventResponse({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
