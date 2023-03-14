class StatementInterpreter {
    constructor (maxCoordenates, localization, statements) {
        this.setDirections()
        this.setSteps()
        this.setCoordenates(localization.x, localization.y)
        this.setInitialDirection(localization.direction)

        this.statements = statements
        this.maxCoordenates = maxCoordenates
    }

    setSteps = () => {
        this.steps = {
            0: () => this.stepIncrement("y", 1),
            1: () => this.stepIncrement("x", 1),
            2: () => this.stepIncrement("y", -1),
            3: () => this.stepIncrement("x", -1)
        }
    }

    setCoordenates = (x, y) => {
        this.coordenates = new Map()
        this.coordenates.set("x", x)
        this.coordenates.set("y", y)
    }

    setDirections = () => {
        this.directions = new Map()
        this.directions.set(0, "N")
        this.directions.set(1, "E")
        this.directions.set(2, "S")
        this.directions.set(3, "W")
        this.directions.set("N", 0)
        this.directions.set("E", 1)
        this.directions.set("S", 2)
        this.directions.set("W", 3)
    }

    setInitialDirection = (initialDirection) => {
        this.direction = this.directions.get(initialDirection)
    }

    step = () => {
        this.steps[this.direction]()

        if (this.coordenates.x > this.maxCoordenates.x) {
            this.coordenates.set("x", this.maxCoordenates.x)
        }

        if (this.coordenates.y > this.maxCoordenates.y) {
            this.coordenates.set("y", this.maxCoordenates.y)

        }

        if (this.coordenates.x < 0) {
            this.coordenates.set("x", 0)
        }

        if (this.coordenates.y < 0) {
            this.coordenates.set("y", 0)
        }
    }

    directionTurner = (range) => {
        this.direction = (this.direction + range) % 4
        if (this.direction == -1) {
            this.direction = 3
        }
    }

    stepIncrement = (axis, range) => {
        const value = this.coordenates.get(axis)
        this.coordenates.set(axis, value + range)
    }

    statementInterpreter = () => {
        this.statements.forEach(element => {
            if (element == "M") {
                this.step()
            } else if (element == "L") {
                this.directionTurner(-1)
            } else if (element == "R") {
                this.directionTurner(1)
            }
        });

        return [
            this.coordenates.get("x"),
            this.coordenates.get("y"),
            this.directions.get(this.direction)
        ]
    }

    execute = () => {
        return this.statementInterpreter()
    }
}

module.exports = StatementInterpreter