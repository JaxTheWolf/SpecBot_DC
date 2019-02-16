const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/textFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PandaFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `pandafact`,
      aliases: [`bamboo_muncherfact`, `pandabeardfact`, `fatdoggofact`],
      group: `animals`,
      memberName: `pandafacts`,
      description: `Sends some random panda fact.`,
      examples: [`pandafact`]
    })
  }
  run (msg) {
    fetchText(msg, `🐼`, `https://some-random-api.ml/pandafact`, `fact`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
