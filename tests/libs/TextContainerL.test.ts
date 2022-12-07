import {describe, it, expect} from '@jest/globals';
import {TextContainerL} from '@/libs/components/content/text/text-container';
import {FieldThis} from '@/libs/components/field/fieldStructure';

describe('TextContainerL class', () => {
	it('.canTag', () => {
		// @ts-ignore
		const r: boolean = TextContainerL.canTag('h1');
		expect(r).toBeTruthy();
	});

	it('.canTag, bad tag', () => {
		// @ts-ignore
		const r: boolean = TextContainerL.canTag('h123');
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

		const r: boolean = TextContainerL.isShow(field);
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

		const r: boolean = TextContainerL.isShow(field);
		expect(r).toBeFalsy();
	});
});
