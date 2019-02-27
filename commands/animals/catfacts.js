const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class catFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `catfact`,
      aliases: [
        `kittyfact`,
        `pussfact`,
        `pussyfact`,
        `catfacts`,
        `kittenfact`,
        `pussycatfact`
      ],
      group: `animals`,
      memberName: `catfacts`,
      description: `Sends a random dog fact`,
      examples: [`catfact`]
    })
  }
  run (msg) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🐱`, `https://some-random-api.ml/catfact`, `fact`)
  }
}
