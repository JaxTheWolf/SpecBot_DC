const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/textFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class catFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `catfact`,
      aliases: [`kittyfact`, `pussfact`, `pussyfact`, `catfacts`, `kittenfact`, `pussycatfact`],
      group: `animals`,
      memberName: `catfacts`,
      description: `Sends some random dog fact.`,
      examples: [`catfact`]
    })
  }
  run (msg) {
    fetchText(msg, `🐱`, `https://some-random-api.ml/catfact`, `fact`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
