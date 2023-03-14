const readline = require('readline')

class CLIInteractor {
    constructor() {
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.lines = []
    }
    
    static getInstance = () => {
        if (!this.instance) {
            this.instance = new CLIInteractor()
        }
        return this.instance
    }
    
    setLines = async (task) => {
        this.interface.on('line', (answer) => {
            this.lines.push(answer)

            if(this.lines[this.lines.length - 1] === "") {
                this.lines.pop()
                this.close()
                task()
            }
        })
    }
      
    close = () => {
        this.interface.close()
    }

    getLines = () => {
        return this.lines
    }

    execute = async (task) => {
        await this.setLines(task)

    }
}

module.exports = CLIInteractor