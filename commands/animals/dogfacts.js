const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class DogFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `dawgfact`,
        `dogefact`,
        `dogfact`,
        `doggiefact`,
        `doggofact`,
        `pupperfact`,
        `puppyfact`
      ],
      description: `Sends a random dog fact`,
      examples: [`dogfact`],
      group: `animals`,
      memberName: `dogfacts`,
      name: `dogfact`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🐶`, `https://some-random-api.ml/dogfact`, `fact`)
  }
}
