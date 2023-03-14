const makeCLIValidator = require("../factories/application/validation/cli-validator")
const makeCLIInteractor = require("../factories/infra/gateways/cli-interactor")
const makeStatementInterpreter = require("../factories/infra/gateways/statement-interpreter")

const setupTask = () => {
    const lines = makeCLIInteractor().getLines()
    const validator = makeCLIValidator(lines)
    const { board, probes } = validator.execute()

    probes.forEach(element => {
        const interpreter = makeStatementInterpreter(board, element.localization, element.statements)
        const result = interpreter.execute()
        console.log(`${result[0]} ${result[1]} ${result[2]}`)
    });
}

module.exports = setupTask