import {XMLParser} from "fast-xml-parser";

const parserXml = new XMLParser()

export const parseXmlToObject = (xml: string | Buffer): object => {
    const resultParse = parserXml.parse(xml)
    if (typeof resultParse !== 'object') {
        throw new Error('Failed to parse xml.')
    }

    return resultParse
}