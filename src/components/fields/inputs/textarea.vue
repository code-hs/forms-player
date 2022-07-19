<template>
	<div class="field input-textarea" :class="common.class">
		<div v-if="text.hint" class="hint">{{ $t(text.hint) }}</div>

		<!--suppress JSUnresolvedFunction -->
		<textarea
			ref="self"
			v-model="modelStore[common.model]"
			:placeholder="$t(text.placeholder)"
			:rows="custom.rows"
			:required="validation.required"
			:class="{error: valid.error}"
			@blur="handleBlur"
			@input="handleInput"
		>
		</textarea>

		<transition name="fade">
			<div
				v-if="validation.errorText"
				:class="{showContent: valid.error}"
				class="error-text"
			>
				{{ $t(validation.errorText) }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {debounce} from '@/utils/debounce';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {InputHelper} from '@/classes/components/field/inputs/InputHelper';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'InputTextarea',
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
				pattern: '',
			}),
		},
	},

	data() {
		return {
			prevValue: '',
			multiBoxName: FH.getMultiName(this),
			valid: {
				dirty: false,
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

		this.processInput = debounce(
			this.processInput,
			FieldValidator.debounceTime
		);
	},

	beforeDestroy() {
		this.validatorDestroy(this.virtualKey);
		// noinspection JSUnresolvedFunction
		bus.$off(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
	},

	methods: {
		...mapMutations({
			validatorAdd: 'validator/add',
			validatorUpdate: 'validator/update',
			validatorDestroy: 'validator/destroy',
		}),
		...mapActions({
			fieldResponseOnValidationEvent: 'validator/fieldResponse',
		}),
		initValidation() {
			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.validatorAdd(this.virtualKey);

				// noinspection JSUnresolvedFunction
				bus.$on(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
			}
		},
		handleBlur() {
			this.validatorProcessAndUpdateDirty();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.common.model] = e.target.value;

			this.validatorProcessDirty();
			InputHelper.processTextPatternDirty(this, e);
		},
		validatorProcessDirty() {
			if (!this.valid.connect) return;

			// only for dirty state
			if (!this.valid.dirty) return;

			this.validatorUpdateError();
			this.validatorSaveInfo();
		},
		validatorProcessAndUpdateDirty(updateStore = true) {
			if (!this.valid.connect) return;

			this.validatorUpdateError();
			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;

			if (updateStore) this.validatorSaveInfo();
		},
		validatorUpdateError() {
			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
		},

		validatorSaveInfo() {
			this.validatorUpdate({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		async validatorHandleTask() {
			this.validatorProcessAndUpdateDirty(false);
			this.fieldResponseOnValidationEvent({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
