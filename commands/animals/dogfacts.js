const { Command } = require(`discord.js-commando`)
const { fetchAnimalFact } = require(`../../libs/animalFactFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DogFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `dogfact`,
      aliases: [`dogfact`, `doggiefact`, `puppyfact`, `pupperfact`, `dawgfact`, `doggofact`, `dogefact`],
      group: `animals`,
      memberName: `dogfacts`,
      description: `Sends some random dog fact.`,
      examples: [`dogfact`]
    })
  }
  run (msg) {
    fetchAnimalFact(msg, `🐶`, `https://some-random-api.ml/dogfact`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
