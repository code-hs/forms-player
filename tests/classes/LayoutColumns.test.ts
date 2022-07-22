import {describe, it, expect} from '@jest/globals';
import {LayoutColumns} from '@/classes/components/layout/columns/LayoutColumns';
import {Field} from '@/classes/scheme/structure';

describe('LayoutColumns class', () => {
	it('.getColumnClasses .1', () => {
		const field: Field = {
			custom: {childCount: 2},
		};
		const classes: string = LayoutColumns.getColumnClasses(field);

		expect(classes).toBe('col-6 ');
	});

	it('.getColumnClasses .2', () => {
		const field: Field = {
			common: {
				class: 'test-col',
			},
			custom: {childCount: 3},
		};
		const classes: string = LayoutColumns.getColumnClasses(field);

		expect(classes).toBe('col-4 test-col ');
	});
});
