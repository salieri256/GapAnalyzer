export const parseCsvToArray = (csv: string): string[][] => {
    const rows = csv.split('\n')
    const resultParse = rows.map(row => row.split(','))
    return resultParse
}