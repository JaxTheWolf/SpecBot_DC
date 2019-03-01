const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class PandaCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`bamboo_muncher`, `pandabear`],
      description: `Sends a random image of a panda`,
      examples: [`panda`],
      group: `animals`,
      memberName: `panda`,
      name: `panda`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/pandaimg`, `link`)
  }
}
