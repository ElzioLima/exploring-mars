const StatementInterpreter = require("../../../../infra/gateways/statement-interpreter")

const makeStatementInterpreter = (board, localization, statements) => {
    return new StatementInterpreter(board, localization, statements)
}

module.exports = makeStatementInterpreter