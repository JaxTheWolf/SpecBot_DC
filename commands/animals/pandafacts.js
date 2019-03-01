const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class PandaFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`bamboo_muncherfact`, `fatdoggofact`, `pandabearfact`],
      description: `Sends a random panda fact`,
      examples: [`pandafact`],
      group: `animals`,
      memberName: `pandafacts`,
      name: `pandafact`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🐼`, `https://some-random-api.ml/pandafact`, `fact`)
  }
}
