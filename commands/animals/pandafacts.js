const { Command } = require(`discord.js-commando`)
const { fetchAnimalFact } = require(`../../libs/animalFactFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PandaFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `pandafact`,
      aliases: [`bamboo_mucherfact`, `pandabeardfact`, `fatdoggofact`],
      group: `animals`,
      memberName: `pandafacts`,
      description: `Sends some random panda fact.`,
      examples: [`pandafact`]
    })
  }
  run (msg) {
    fetchAnimalFact(msg, `🐼`, `https://some-random-api.ml/pandafact`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
