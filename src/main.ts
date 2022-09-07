import { readFile } from 'fs/promises'
import { createInterface } from 'readline'
import { JSDOM } from 'jsdom'

const main = async () => {
    const io = createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    const asyncio = io[Symbol.asyncIterator]()

    const inputFilePath = await (async () => {
        if (process.argv[2]) {
            return process.argv[2]
        }
        else {
            console.log('report.html path: ')
            return (await asyncio.next()).value
        }
    })()

    const outputFilePath = await (async () => {
        if (process.argv[3]) {
            return process.argv[3]
        }
        else {
            console.log('output csv path: ')
            return (await asyncio.next()).value
        }
    })()

    const html = await (async () => {
        try {
            return await readFile(inputFilePath, 'utf-8')
        }
        catch (e) {
            console.log('Could not open file.')
            process.exit(1)
        }
    })()

    const dom = new JSDOM(html)

    io.close()
}

main()