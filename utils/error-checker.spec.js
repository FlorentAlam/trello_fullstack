import { checkLength, checkPasswordEquality } from './error-checker.ts';

describe('length checker', () => {
    it('should return false when length is not enough', () => {
        let res = checkLength("Hi", 12);
        expect(res).toBe(false);
        expect(res).not.toBe(true);
    });

    it('should return true when length is enough', () => {
        let res = checkLength("Florent", 5);
        expect(res).toBe(true);
    });

    it('should throw an error if one value is missing', () => {
        expect(() => {
            checkLength(5);
        }).toThrow();
    });
});

describe('password equality checker', () => {
    it('should return false when passwords don\'t match', () => {
        let res = checkPasswordEquality("Test", "Teste");
        expect(res).toBe(false);
    });

    it('should return false when passwords don\'t match perfectly', () => {
        let res = checkPasswordEquality("Test", "test");
        expect(res).toBe(false);
    });

    it('should return true when passwords match', () => {
        let res = checkPasswordEquality("Florent", "Florent");
        expect(res).toBe(true);
    });

    it('should throw an error if one value is missing', () => {
        expect(() => {
            checkPasswordEquality("test");
        }).toThrow();
    });

    it('should throw an error if one value is not a string', () => {
        expect(() => {
            checkPasswordEquality("test", 4);
        }).toThrow();
    });
});