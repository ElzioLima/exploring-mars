const CLIInteractor = require("../../../../infra/gateways/cli-interactor")

const makeCLIInteractor = () => {
    return CLIInteractor.getInstance()
}

module.exports = makeCLIInteractor