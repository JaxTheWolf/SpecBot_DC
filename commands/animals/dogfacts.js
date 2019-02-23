const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/textFetcher`)
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
      description: `Sends a random dog fact`,
      examples: [`dogfact`]
    })
  }
  run (msg) {
    fetchText(msg, `🐶`, `https://some-random-api.ml/dogfact`, `fact`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
