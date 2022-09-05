import { createInterface } from 'readline'

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

    io.close()
}

main()