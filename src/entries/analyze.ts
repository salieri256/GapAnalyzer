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


    const pathFileOutput = process.argv[4]

    const bufferPathsLearned = await readFile(pathFilePathsLearned)
    const textPathsLearned = bufferPathsLearned.toString()
    const arrayCsv = parseCsvToArray(textPathsLearned)
    const pathsLearnedPrior = arrayCsv.map(keyChain => Path.fromArray(keyChain))

    console.log(`based: ${pathFileOutput}`)

    for (const nameFileAnalysis of namesFileAnalysis) {
        let numberLearned = 0
        let numberNew = 0
        let numberMinor = 0
        let numberMajor = 0

        const pathFileAnalysis = path.join(pathDirAnalysis, nameFileAnalysis)
        const textAnalysis = await readFile(pathFileAnalysis)
        const objectXml = parseXmlToObject(textAnalysis)
        const pathsAnalysis = Path.fromObject(objectXml)

        const streamWritableMinor = createWriteStream(`samples/minors/${pathFileOutput}_${nameFileAnalysis}.csv`)
        const streamWritableMajor = createWriteStream(`samples/majors/${pathFileOutput}_${nameFileAnalysis}.csv`)

        for (const pathAnalysis of pathsAnalysis) {
            const isLearned = pathAnalysis.isLearned(pathsLearnedPrior)
            if (isLearned) {
                numberLearned++
                continue
            }
            numberNew++

            const isMinor = pathAnalysis.isMinor(pathsLearnedPrior)
            if (isMinor) {
                numberMinor++

                const textWritten = pathAnalysis.toString()
                streamWritableMinor.write(`${textWritten}\n`)
            }
            else {
                numberMajor++

                const textWritten = pathAnalysis.toString()
                streamWritableMajor.write(`${textWritten}\n`)
            }
        }

        console.log(`${nameFileAnalysis} -> alreadyLearned: ${numberLearned}, new: ${numberNew} (majors: ${numberMajor}, minors: ${numberMinor})`)

        streamWritableMajor.end()
    }
}

analyze()