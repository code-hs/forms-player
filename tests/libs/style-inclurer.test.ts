import {describe, it, expect} from '@jest/globals';
import {StyleIncluder} from '@/libs/utils/style-includer';
import {Scheme} from '@/libs/scheme/scheme-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

const endLine = '\r\n';

describe('StyleIncluder class -> toString', () => {
	// noinspection UnnecessaryLocalVariableJS
	const scheme: Scheme = {
		config: {
			styles: {
				value: ['1', '2', '3'],
			},
		},
		pages: [
			{
				key: 'welcome_1',
				components: [
					{
						common: {
							enable: false,
							type: 'InputText',
							model: 'address_1',
						},
						styles: {
							value: ['4', '5'],
						},
					},
					{
						common: {
							type: 'InputText',
							model: 'address_2',
							enable: false,
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
	const str: string = new StyleIncluder().toString();

	it('correct work', () => {
		expect(str).toBe(`1 ${endLine}2 ${endLine}3  `);
	});
});
