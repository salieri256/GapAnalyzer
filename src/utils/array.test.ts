import {endsWith, equals, startsWith} from "./array";

describe('equals()', () => {
    test('case1', () => {
        expect(equals([], [])).toBe(true)
    })

    test('case2', () => {
        expect(equals([''], [''])).toBe(true)
    })

    test('case3', () => {
        expect(equals([], [''])).toBe(false)
    })

    test('case4', () => {
        expect(equals([''], [])).toBe(false)
    })
})

describe('startsWith()', () => {
    test('case1', () => {
        expect(startsWith([], [])).toBe(true)
    })

    test('case2', () => {
        expect(startsWith([''], [''])).toBe(true)
    })

    test('case3', () => {
        expect(startsWith([''], [])).toBe(true)
    })

    test('case3', () => {
        expect(startsWith([], [''])).toBe(false)
    })
})

describe('endsWith()', () => {
    test('case1', () => {
        expect(endsWith([], [])).toBe(true)
    })

    test('case2', () => {
        expect(endsWith([''], [''])).toBe(true)
    })

    test('case3', () => {
        expect(endsWith([''], [])).toBe(true)
    })

    test('case4', () => {
        expect(endsWith([], [''])).toBe(false)
    })
})