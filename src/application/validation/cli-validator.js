const InvalidEntryData = require("./errors/invalid-entry-data")

class CLIValidator {
    constructor (lines) {
        this.lines = lines
    }

    filterBoard = () => {
        const firstString = this.lines[0].toString()
        if (!firstString.match(/^\d+\s+\d+\s*$/)) {
            throw new InvalidEntryData()
        }

        const boardlist = firstString.split(" ")
        return {
            x: Number(boardlist[0]),
            y: Number(boardlist[1])
        }
    }

    filterProbes = () => {
        this.lines.shift()
        if (this.lines.length % 2 === 0 && this.lines.length < 2) {
            throw new InvalidEntryData()
        }
        const evenIndexedElements = this.lines.filter((element, index) => index % 2 === 0)
        const oddIndexedElements = this.lines.filter((element, index) => index % 2 !== 0)
        for (let i = 0; i < evenIndexedElements.length; i++) {
            oddIndexedElements.forEach(element => {
                if (!element.match(/^[L || R || M ]*\s*$/)) {
                    throw new InvalidEntryData()
                }
            })
            evenIndexedElements.forEach(element => {
                if (!element.match(/^\d+\s+\d+\s+[N || E || S || W]\s*$/)) {
                    throw new InvalidEntryData()
                }
            })
        }

        const probes = evenIndexedElements.map((element, index) => {
            const localizationList = element.split(" ")
            return {
                localization: {
                    direction: localizationList[2],
                    x: Number(localizationList[0]),
                    y: Number(localizationList[1])
                },
                statements: oddIndexedElements[index].split("")
            }
        })

        return probes
    }

    execute = () => {
        if (this.lines.length === 0) {
            throw new InvalidEntryData()
        }
        const board = this.filterBoard()
        const probes = this.filterProbes()
        return {
            board,
            probes
        }
    }
}

module.exports = CLIValidator