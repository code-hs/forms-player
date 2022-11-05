import {describe, it, expect} from '@jest/globals';
import {StyleIncludeL} from '@/libs/utils/StyleIncludeL';
import {Scheme} from '@/libs/scheme/schemeStructure';
import {SchemeController} from '@/libs/scheme/SchemeController';

describe('StyleIncludeL class -> findIndex', () => {
	const scheme: Scheme = {
		config: {
			styles: {
				values: ['1', '2', '3'],
			},
		},
		pages: [
			{
				key: 'welcome_1',
				components: [
					{
						common: {
							type: 'InputText',
							model: 'address_1',
						},
						styles: {
							values: ['4', '5'],
						},
					},
					{
						common: {
							type: 'InputText',
							model: 'address_2',
							enable: true,
						},
						styles: {
							value: '6',
						},
						components: [
							{
								common: {
									type: 'InputText',
									model: 'address_4',
									enable: false,
								},
								styles: {
									value: '7',
								},
							},
						],
					},
					{
						common: {
							type: 'InputText',
							model: 'address_3',
							enable: false,
						},
						styles: {
							value: '8',
						},
					},
				],
			},
		],
	};
	// @ts-ignore
	SchemeController.scheme = scheme;

	const str = StyleIncludeL.getAllStylesAsStr();

	it('correct work', () => {
		expect(str).toBe('1 2 3  4 5  6 ');
	});
});
