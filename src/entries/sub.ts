import {Path} from "features/path/Path";
import {createWriteStream, createReadStream} from "fs";
import {readdir, readFile} from "fs/promises";
import * as path from "path";
import { createInterface } from "readline/promises";

const sub = async () => {
    if (process.argv[2] === undefined) {
        throw new Error('Input-minuend-dir path is required.')
    }
    const pathDirInputMinuend = process.argv[2]
    const namesFileInputMinuend = await readdir(pathDirInputMinuend)

    if (process.argv[3] === undefined) {
        throw new Error('Input-Subtrahend-dir path is required.')
    }
    const pathDirInputSubtrahend = process.argv[3]
    const namesFileInputSubtrahend = await readdir(pathDirInputSubtrahend)


    if (process.argv[4] === undefined) {
        throw new Error('Output-file path is required.')
    }
    const pathFileOutput = process.argv[4]

    const pathsMinuend: Path[] = []
    for (const nameFileInputMinuend of namesFileInputMinuend) {
        const pathFileInputMinuend = path.join(pathDirInputMinuend, nameFileInputMinuend)
        const streamReadable = createReadStream(pathFileInputMinuend)
        const rl = createInterface({
            input: streamReadable
        })
        for await (const line of rl) {
            const linePure = line.replace(/\r?\n/g, '')
            const path = Path.fromPathString(linePure)
            pathsMinuend.push(path)
        }
    }

    const pathsSubtrahend: Path[] = []
    for (const nameFileInputSubtrahend of namesFileInputSubtrahend) {
        const pathFileInputSubtrahend = path.join(pathDirInputSubtrahend, nameFileInputSubtrahend)
        const streamReadable = createReadStream(pathFileInputSubtrahend)
        const rl = createInterface({
            input: streamReadable
        })
        for await (const line of rl) {
            const linePure = line.replace(/\r?\n/g, '')
            const path = Path.fromPathString(linePure)
            pathsSubtrahend.push(path)
        }
    }

    const pathsDiff: Path[] = []
    pathsMinuend.forEach(pathMinuend => {
        for (const pathSubtrahend of pathsSubtrahend) {
            if (pathMinuend.equals(pathSubtrahend)) {
                return
            }
        }

        pathsDiff.push(pathMinuend)
    })

    const streamWritable = createWriteStream(pathFileOutput)
    for (const pathDiff of pathsDiff) {
        const textWritten = pathDiff.toString()
        console.log(textWritten)
        streamWritable.write(`${textWritten}\n`)
    }

    streamWritable.end()
}

sub()