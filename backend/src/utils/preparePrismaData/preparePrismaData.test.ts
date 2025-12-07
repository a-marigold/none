import { describe, it, expect } from 'vitest';

import { preparePrismaData } from './preparePrismaData';

describe('preparePrismaData', () => {
    it('should return the same object if the object does not have any null or bigint inside', () => {
        const testObject = {
            prop1: 'hello',
            prop2: 16,
            prop3: { propInside1: '1', propInside2: 2 },
            prop4: ['1', undefined, 3],
        };

        expect(preparePrismaData(testObject)).toEqual(testObject);
    });

    it('should turn every `null` to `undefined`, `bigint` to `number` in the object', () => {
        const testObject = {
            prop1: null,
            prop2: 16n,
            prop3: { propInside1: null, propInside2: 10n },
            prop4: [16n, 16n, null, { propInside1: 16n }, 16n, 16n],
        };

        const expectedObject = {
            prop1: undefined,
            prop2: 16,
            prop3: { propInside1: undefined, propInside2: 10 },
            prop4: [16, 16, undefined, { propInside1: 16 }, 16, 16],
        };

        expect(preparePrismaData(testObject)).toEqual(expectedObject);
    });
});
