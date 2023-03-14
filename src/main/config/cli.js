const makeCLIInteractor = require("../factories/infra/gateways/cli-interactor")
const setupTask = require("./task")

const setupCLI = async (task) => {
    await makeCLIInteractor().execute(() => {
        setupTask()
    })
}

module.exports = setupCLI