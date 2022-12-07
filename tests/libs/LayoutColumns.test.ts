import {describe, it, expect} from '@jest/globals';
import {LayoutColumns} from '@/libs/components/layout/columns/layout-columns';
import {Field} from '@/libs/scheme/schemeStructure';

describe('LayoutColumns class', () => {
	it('.getColumnClasses .1', () => {
		const field: Field = {
			common: {type: 'test'},
			custom: {childCount: 2},
		};
		const classes: string = LayoutColumns.getColumnClasses(field);

		expect(classes).toBe('col-6 ');
	});

	it('.getColumnClasses .2', () => {
		const field: Field = {
			common: {
				type: 'test',
				class: 'test-col',
			},
			custom: {childCount: 3},
		};
		const classes: string = LayoutColumns.getColumnClasses(field);

		expect(classes).toBe('col-4 test-col ');
	});
});
