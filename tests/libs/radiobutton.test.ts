import {describe, it, expect} from '@jest/globals';
import {Options, RadiobuttonsL, OnInputEvent} from '@/libs/components/field/inputs/radiobutton';
import {Action} from '@/libs/utils/actioner/structure';

describe('Radiobuttons', () => {
	const act1: Action = {
		type: 'SHOW_CONTAINER',
		nextSibling: 1,
	};
	const act2: Action = {
		type: 'HIDE_CONTAINER',
		nextSibling: 1,
	};

	const options: Options = [
		{
			value: 'yes',
			text: '#Yes',
			action: act1,
		},
		{
			value: 'no',
			text: '#No',
			action: act2,
		},
	];

	it('Radiobutton class -> getAction, correct work', () => {
		const eventHandler: OnInputEvent = {target: {value: 'yes'}};
		const action: Action = RadiobuttonsL.getAction(options, eventHandler) as Action;

		expect(action.type).toBe('SHOW_CONTAINER');
	});

	it('Radiobutton class -> getAction, cant find item', () => {
		const eventHandler: OnInputEvent = {target: {value: 'test 123213'}};
		const action: undefined = RadiobuttonsL.getAction(options, eventHandler) as undefined;

		expect(action).toBe(undefined);
	});
});
