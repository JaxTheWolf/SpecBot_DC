const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class catFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `catfacts`,
        `kittenfact`,
        `kittyfact`,
        `pussfact`,
        `pussycatfact`,
        `pussyfact`
      ],
      description: `Sends a random dog fact`,
      examples: [`catfact`],
      group: `animals`,
      memberName: `catfacts`,
      name: `catfact`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🐱`, `https://some-random-api.ml/catfact`, `fact`)
  }
}
