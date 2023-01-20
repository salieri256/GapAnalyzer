import {Path} from "features/path/Path";
import {createWriteStream} from "fs";
import {readdir, readFile} from "fs/promises";
import {parseXmlToObject} from "libs/xmlParser";
import * as path from "path";

const learn = async () => {
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

    for (const nameFileInput of namesFileInput) {
        const pathFileInput = path.join(pathDirInput, nameFileInput)
        const bufferInput = await readFile(pathFileInput)
        const objectXml = parseXmlToObject(bufferInput)
        const paths = Path.fromObject(objectXml)

        for (const path of paths) {
            const textWritten = path.toStringForCsv()
            streamWritable.write(`${textWritten}\n`)
        }
    }

    streamWritable.end()
}

learn()