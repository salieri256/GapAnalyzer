import { readFile } from 'fs/promises'
import { createWriteStream } from 'fs'
import { createInterface } from 'readline'
import { JSDOM } from 'jsdom'

const extractDetectionDetail = (text: string) => {
    const texts = text.trim().split(' ')

    return {
        newElementNum: Number( texts[0] ),
        majorElementNum: Number( texts[3].slice(1, texts[3].length) ),
        majorTailPathNum: Number( texts[4].slice(6, texts[4].length) ),
        minorElementNum: Number( texts[6] ),
    }
}

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

    const detectionResults = []

    for (const elm of dom.window.document.body.children) {
        if (elm.tagName === 'SPAN' && elm.classList.contains('programlist')) {
            const detectionResult = {
                title: '',
                detail: {
                    newElementNum: 0,
                    majorElementNum: 0,
                    majorTailPathNum: 0,
                    minorElementNum: 0,
                }
            }

            for (const elm2 of elm.children) {
                if (elm2.tagName === 'H2') {
                    detectionResult.title = elm2.textContent ?? ''
                }
                else if(elm2.tagName === 'H3') {
                    const text = elm2.textContent

                    if(text?.includes('new elements')) {
                        const detectionDetail = extractDetectionDetail(text)
                        detectionResult.detail = detectionDetail
                    }
                }
            }

            detectionResults.push(detectionResult)
        }
    }

    const stream = createWriteStream(outputFilePath)
    stream.write('file name,new elements,major elements,tail paths,minor elements\n')
    detectionResults.forEach(res => {
        stream.write(`${res.title},${res.detail.newElementNum},${res.detail.majorElementNum},${res.detail.majorTailPathNum},${res.detail.minorElementNum}\n`)
    })
    stream.end()

    io.close()
}

main()