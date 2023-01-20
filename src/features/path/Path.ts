import {endsWith, equals, startsWith} from "utils/array";

export class Path {
    private readonly value: string[]

    private constructor(value: string[]) {
        this.value = [...value]
    }

    private extractKeyChainEndExclusive() {
        //return this.value.slice(0, -1)
        if (this.value.length <= 2) {
            return [...this.value]
        }
        return [...this.value.slice(0, -1)]
    }

    private extractKeyChainEnd() {
        //return this.value.slice(-2)
        if (this.value.length <= 2) {
            return [...this.value]
        }
        return [...this.value.slice(-2)]
    }

    private startsWith(keyChain: string[]): boolean {
        return startsWith(this.value, keyChain)
    }

    private endsWith(keyChain: string[]): boolean {
        return endsWith(this.value, keyChain)
    }

    isMinor(pathsLearned: Path[]): boolean {
        let existsPathSameEndExclusive = false
        let existsPathSameEnd = false
        const keyChainThisEndExclusive = this.extractKeyChainEndExclusive()
        const keyChainThisEnd = this.extractKeyChainEnd()

        for (const pathLearned of pathsLearned) {
            if (equals(keyChainThisEndExclusive, pathLearned.value)) existsPathSameEndExclusive = true
            if (pathLearned.endsWith(keyChainThisEnd)) existsPathSameEnd = true
        }

        return existsPathSameEndExclusive && existsPathSameEnd
    }

    isMajor(pathsLearned: Path[]): boolean {
        return !this.isMinor(pathsLearned)
    }

    toString(): string {
        return this.value.join('/')
    }

    toStringForCsv(): string {
        return this.value.join(',')
    }

    static fromArray(keyChain: string[]): Path {
        return new Path(keyChain)
    }

    private static getKeyChains(previousKeyChain: string[], obj: object): string[][] {
        const keyChains = [
            ...Object.entries(obj).flatMap(([key, value]) => {
                if (typeof value === 'object') {
                    const nextKeyChains = this.getKeyChains([key], value)
                    return nextKeyChains.map(nextKeyChain => {
                        return [...previousKeyChain, ...nextKeyChain]
                    })
                }
                else {
                    return [[...previousKeyChain, key]]
                }
            })
        ]

        if (!Array.isArray(obj)) {
            keyChains.unshift(previousKeyChain)
        }

        const keyChainsRemovedEmptyKey = keyChains.filter(keyChain => keyChain.length !== 0)
        const keyChainsRemovedArrayIndexKey = keyChainsRemovedEmptyKey.map(keyChain => keyChain.filter(key => isNaN(Number(key))))
        const keyChainsRemovedTextKey = keyChainsRemovedArrayIndexKey.filter(keyChain => keyChain.find(key => key.at(0) === '#') === undefined)
        return keyChainsRemovedTextKey
    }

    static fromObject(obj: object): Path[] {
        return this.getKeyChains([], obj).map(keyChain => {
            return new Path(keyChain)
        })
    }
}