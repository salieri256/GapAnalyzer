export const equals = (array1: unknown[], array2: unknown[]): boolean => {
    if (array1.length !== array2.length) return false

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false
    }

    return true
}

export const startsWith = (array: unknown[], searchArray: unknown[]): boolean => {
    const arrayMaxLengthSearchElements = array.slice(0, searchArray.length)
    return equals(arrayMaxLengthSearchElements, searchArray)
}

export const endsWith = (array: unknown[], searchArray: unknown[]): boolean => {
    //const arrayMaxLengthSearchElements = array.slice(-searchArray.length)
    const arrayMaxLengthSearchElements = searchArray.length === 0 ? [] : array.slice(-searchArray.length)
    return equals(arrayMaxLengthSearchElements, searchArray)
}