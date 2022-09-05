import { readFile } from 'fs/promises'
import { createInterface } from 'readline'
import { JSDOM } from 'jsdom'

const main = async () => {
    const io = createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    const asyncio = io[Symbol.asyncIterator]()

    const filePath = await (async () => {
        if (process.argv[2]) {
            return process.argv[2]
        }
        else {
            console.log('dir: ')
            return (await asyncio.next()).value
        }
    })()

    const html = await (async () => {
        try {
            return await readFile(filePath, 'utf-8')
        }
        catch (e) {
            console.log('File not found.')
            process.exit(1)
        }
    })()

    const dom = new JSDOM(html)

    io.close()
}

main()