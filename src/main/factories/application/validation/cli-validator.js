const CLIValidator = require("../../../../application/validation/cli-validator")

const makeCLIValidator = (lines) => {
    return new CLIValidator(lines)
}

module.exports = makeCLIValidator