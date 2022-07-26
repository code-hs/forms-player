import {describe, it, expect} from '@jest/globals';
import {TextContainerHelper} from '@/classes/components/content/text/TextContainerHelper';
import {FieldThis} from '@/classes/scheme/structure';

describe('TextContainerHelper class', () => {
	it('.canTag', () => {
		// @ts-ignore
		const r: boolean = TextContainerHelper.canTag('h1');
		expect(r).toBeTruthy();
	});

	it('.canTag, bad tag', () => {
		// @ts-ignore
		const r: boolean = TextContainerHelper.canTag('h123');
		expect(r).toBeFalsy();
	});

	it('.isShow', () => {
		const field: FieldThis = {
			custom: {
				tag: 'h1',
			},
			text: {
				value: 'text',
			},
		};

		const r: boolean = TextContainerHelper.isShow(field);
		expect(r).toBeTruthy();
	});

	it('.isShow, bad text value', () => {
		const field: FieldThis = {
			custom: {
				tag: 'h1',
			},
			text: {
				value: '',
			},
		};

		const r: boolean = TextContainerHelper.isShow(field);
		expect(r).toBeFalsy();
	});
});
