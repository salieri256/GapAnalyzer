import {Path} from "features/path/Path";
import {createWriteStream, createReadStream} from "fs";
import {readdir, readFile} from "fs/promises";
import {parseXmlToObject} from "libs/xmlParser";
import * as path from "path";
import { createInterface } from "readline/promises";

const and = async () => {
    if (process.argv[2] === undefined) {
        throw new Error('Input-dir path is required.')
    }
    const pathDirInput = process.argv[2]
    const namesFileInput = await readdir(pathDirInput)

    if (process.argv[3] === undefined) {
        throw new Error('Output-file path is required.')
    }
    const pathFileOutput = process.argv[3]

    const streamWritable = createWriteStream(pathFileOutput)

    let pathsAnd: Path[] = []

    for (const [index, nameFileInput] of namesFileInput.entries()) {
        const pathFileInput = path.join(pathDirInput, nameFileInput)
        const streamReadable = createReadStream(pathFileInput)
        const rl = createInterface({
            input: streamReadable
        })

        const paths: Path[] = []
        for await (const line of rl) {
            const linePure = line.replace(/\r?\n/g, '')
            const path = Path.fromPathString(linePure)
            paths.push(path)
        }

        if (index === 0) {
            pathsAnd.push(...paths)
            continue
        }

        pathsAnd = pathsAnd.filter(pathAnd => {
            for (const path of paths) {
                if (path.equals(pathAnd)) {
                    return true
                }
            }

            return false
        })
    }

    // 重複削除
    const pathsAndNew: Path[] = []
    pathsAnd.forEach(pathAnd => {
        for (const pathAndNew of pathsAndNew) {
            if (pathAndNew.equals(pathAnd)) {
                return
            }
        }

        pathsAndNew.push(pathAnd)
    })

    for (const pathAnd of pathsAndNew) {
        const textWritten = pathAnd.toString()
        console.log(textWritten)
        streamWritable.write(`${textWritten}\n`)
    }

    streamWritable.end()
}

and()