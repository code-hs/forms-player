export class FieldPropser {
	static multiboxIndex = () => ({
		type: Number,
		required: false,
		default: -1,
	});

	static itemKey = () => ({
		type: Number,
		required: true,
	});

	static generalParams = () => ({
		type: Object,
		required: true,
	});
}
