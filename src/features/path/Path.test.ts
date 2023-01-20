import {Path} from "./Path";

describe('extractKeyChainEndExclude()', () => {
    const path1 = Path.fromArray(['0', '1', '2', '3', '4'])
    const path2 = Path.fromArray(['0', '1'])
    const path3 = Path.fromArray(['0'])
    const path4 = Path.fromArray([])

    test('path1-case1', () => {
        expect(path1["extractKeyChainEndExclusive"]()).toStrictEqual(['0', '1', '2', '3'])
    })
    test('path2-case1', () => {
        expect(path2["extractKeyChainEndExclusive"]()).toStrictEqual(['0', '1'])
    })
    test('path3-case1', () => {
        expect(path3["extractKeyChainEndExclusive"]()).toStrictEqual(['0'])
    })
    test('path4-case1', () => {
        expect(path4["extractKeyChainEndExclusive"]()).toStrictEqual([])
    })
})

describe('extractKeyChainEnd()', () => {
    const path1 = Path.fromArray(['0', '1', '2', '3', '4'])
    const path2 = Path.fromArray(['0', '1'])
    const path3 = Path.fromArray(['0'])
    const path4 = Path.fromArray([])

    test('path1-case1', () => {
        expect(path1["extractKeyChainEnd"]()).toStrictEqual(['3', '4'])
    })
    test('path2-case1', () => {
        expect(path2["extractKeyChainEnd"]()).toStrictEqual(['0', '1'])
    })
    test('path3-case1', () => {
        expect(path3["extractKeyChainEnd"]()).toStrictEqual(['0'])
    })
    test('path4-case1', () => {
        expect(path4["extractKeyChainEnd"]()).toStrictEqual([])
    })
})

describe('startsWith()', () => {
    const path1 = Path.fromArray(['0', '1', '2', '3', '4'])
    const path2 = Path.fromArray(['0', '1'])
    const path3 = Path.fromArray(['0'])
    const path4 = Path.fromArray([])

    test('path1-case1', () => {
        expect(path1["startsWith"]([])).toBe(true)
    })
    test('path1-case2', () => {
        expect(path1["startsWith"](['0'])).toBe(true)
    })
    test('path1-case3', () => {
        expect(path1["startsWith"](['0', '1', '2', '3', '4'])).toBe(true)
    })
    test('path1-case4', () => {
        expect(path1["startsWith"](['0', '1', '2', '3', '4', '5'])).toBe(false)
    })

    test('path2-case1', () => {
        expect(path2["startsWith"]([])).toBe(true)
    })
    test('path2-case2', () => {
        expect(path2["startsWith"](['0'])).toBe(true)
    })
    test('path2-case3', () => {
        expect(path2["startsWith"](['0', '1'])).toBe(true)
    })
    test('path2-case4', () => {
        expect(path2["startsWith"](['0', '1', '2'])).toBe(false)
    })

    test('path3-case1', () => {
        expect(path3["startsWith"]([])).toBe(true)
    })
    test('path3-case2', () => {
        expect(path3["startsWith"](['0'])).toBe(true)
    })
    test('path3-case3', () => {
        expect(path3["startsWith"](['0', '1'])).toBe(false)
    })

    test('path4-case1', () => {
        expect(path4["startsWith"]([])).toBe(true)
    })
    test('path4-case2', () => {
        expect(path4["startsWith"](['0'])).toBe(false)
    })
})

describe('endsWith()', () => {
    const path1 = Path.fromArray(['0', '1', '2', '3', '4'])
    const path2 = Path.fromArray(['0', '1'])
    const path3 = Path.fromArray(['0'])
    const path4 = Path.fromArray([])

    test('path1-case1', () => {
        expect(path1["endsWith"]([])).toBe(true)
    })
    test('path1-case2', () => {
        expect(path1["endsWith"](['4'])).toBe(true)
    })
    test('path1-case3', () => {
        expect(path1["endsWith"](['0', '1', '2', '3', '4'])).toBe(true)
    })
    test('path1-case4', () => {
        expect(path1["endsWith"](['-1', '0', '1', '2', '3', '4'])).toBe(false)
    })

    test('path2-case1', () => {
        expect(path2["endsWith"]([])).toBe(true)
    })
    test('path2-case2', () => {
        expect(path2["endsWith"](['1'])).toBe(true)
    })
    test('path2-case3', () => {
        expect(path2["endsWith"](['0', '1'])).toBe(true)
    })
    test('path2-case4', () => {
        expect(path2["endsWith"](['-1', '0', '1'])).toBe(false)
    })

    test('path3-case1', () => {
        expect(path3["endsWith"]([])).toBe(true)
    })
    test('path3-case2', () => {
        expect(path3["endsWith"](['0'])).toBe(true)
    })
    test('path3-case3', () => {
        expect(path3["endsWith"](['-1', '0'])).toBe(false)
    })

    test('path4-case1', () => {
        expect(path4["endsWith"]([])).toBe(true)
    })
    test('path4-case2', () => {
        expect(path4["endsWith"](['0'])).toBe(false)
    })
})

describe('isMinor()', () => {
    const path1 = Path.fromArray(['0', '1', '2', '3', '4'])
    const path2 = Path.fromArray(['0', '1'])
    const path3 = Path.fromArray(['0'])
    const path4 = Path.fromArray([])

    test('path1-case1', () => {
        const pathsLearned = [
            Path.fromArray(['0', '1', '2', '3']),
            Path.fromArray(['3', '4']),
        ]
        expect(path1["isMinor"](pathsLearned)).toBe(true)
    })
    test('path1-case2', () => {
        const pathsLearned = [
            Path.fromArray(['0', '1', '2', '3', '4'])
        ]
        expect(path1["isMinor"](pathsLearned)).toBe(true)
    })
    test('path1-case3', () => {
        const pathsLearned = [
            Path.fromArray(['0', '1', '2', '3']),
        ]
        expect(path1["isMinor"](pathsLearned)).toBe(false)
    })
    test('path1-case4', () => {
        const pathsLearned = [
            Path.fromArray(['3', '4']),
        ]
        expect(path1["isMinor"](pathsLearned)).toBe(false)
    })
    test('path1-case5', () => {
        const pathsLearned: Path[] = []
        expect(path1["isMinor"](pathsLearned)).toBe(false)
    })
    test('path1-case6', () => {
        const pathsLearned: Path[] = [
            Path.fromArray(['0', '1', '2']),
            Path.fromArray(['3', '4']),
        ]
        expect(path1["isMinor"](pathsLearned)).toBe(false)
    })

    test('path2-case1', () => {
        const pathsLearned = [
            Path.fromArray(['0']),
            Path.fromArray(['1']),
        ]
        expect(path2["isMinor"](pathsLearned)).toBe(true)
    })
    test('path2-case2', () => {
        const pathsLearned = [
            Path.fromArray(['0', '1']),
        ]
        expect(path2["isMinor"](pathsLearned)).toBe(true)
    })
    test('path2-case3', () => {
        const pathsLearned = [
            Path.fromArray(['0']),
        ]
        expect(path2["isMinor"](pathsLearned)).toBe(false)
    })
    test('path2-case4', () => {
        const pathsLearned = [
            Path.fromArray(['1']),
        ]
        expect(path2["isMinor"](pathsLearned)).toBe(false)
    })
    test('path2-case5', () => {
        const pathsLearned: Path[] = []
        expect(path2["isMinor"](pathsLearned)).toBe(false)
    })

    test('path3-case1', () => {
        const pathsLearned = [
            Path.fromArray(['0']),
        ]
        expect(path3["isMinor"](pathsLearned)).toBe(true)
    })
    test('path3-case2', () => {
        const pathsLearned: Path[] = []
        expect(path3["isMinor"](pathsLearned)).toBe(false)
    })

    test('path4-case1', () => {
        const pathsLearned: Path[] = []
        expect(path4["isMinor"](pathsLearned)).toBe(false)
    })
})

describe('toString()', () => {
    const path = Path.fromArray(['0', '1', '2'])
    test('case1', () => {
        expect(path["toString"]()).toBe('0/1/2')
    })
})

describe('fromObject()', () => {
    const obj = {
        p1: {
            p11: '',
            p12: '',
        },
        p2: {
            p21: '',
            p22: '',
        },
        '#text': '',
    }
    const paths = Path.fromObject(obj)

    test('case1', () => {
        expect(paths.length).toBe(6)
        expect(paths[0].toString()).toBe('p1')
        expect(paths[1].toString()).toBe('p1/p11')
        expect(paths[2].toString()).toBe('p1/p12')
        expect(paths[3].toString()).toBe('p2')
        expect(paths[4].toString()).toBe('p2/p21')
        expect(paths[5].toString()).toBe('p2/p22')
    })
})