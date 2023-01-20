import {Path} from "features/path/Path";
import {createWriteStream} from "fs";
import {readdir, readFile} from 'fs/promises'
import {parseCsvToArray} from "libs/csvParser";
import {parseXmlToObject} from "libs/xmlParser";
import * as path from "path";

const analyze = async () => {
    if (process.argv[2] === undefined) {
        throw new Error('Input-dir path is required.')
    }
    const pathDirAnalysis = process.argv[2]
    const namesFileAnalysis = await readdir(pathDirAnalysis)

    if (process.argv[3] === undefined) {
        throw new Error('Learned-paths-file path is required.')
    }
    const pathFilePathsLearned = process.argv[3]

    if (process.argv[4] === undefined) {
        throw new Error('Output-file path is required.')
    }
    const pathFileOutput = process.argv[4]

    const streamWritable = createWriteStream(pathFileOutput)
    streamWritable.write(`name,major,minor\n`)

    const bufferPathsLearned = await readFile(pathFilePathsLearned)
    const textPathsLearned = bufferPathsLearned.toString()
    const arrayCsv = parseCsvToArray(textPathsLearned)
    const pathsLearnedPrior = arrayCsv.map(keyChain => Path.fromArray(keyChain))

    for (const nameFileAnalysis of namesFileAnalysis) {
        let numberMinor = 0
        let numberMajor = 0

        const pathFileAnalysis = path.join(pathDirAnalysis, nameFileAnalysis)
        const textAnalysis = await readFile(pathFileAnalysis)
        const objectXml = parseXmlToObject(textAnalysis)
        const pathsAnalysis = Path.fromObject(objectXml)

        for (const pathAnalysis of pathsAnalysis) {
            const isMinor = pathAnalysis.isMinor(pathsLearnedPrior)

            if (isMinor) {
                numberMinor++;
            }
            else {
                numberMajor++;
                console.log(pathAnalysis.toString())
            }
        }

        const textWritten = `${nameFileAnalysis},${numberMajor},${numberMinor}`
        streamWritable.write(`${textWritten}\n`)
    }

    streamWritable.end()
}

analyze()