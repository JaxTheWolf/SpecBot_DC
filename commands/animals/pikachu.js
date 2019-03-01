const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class PikachuCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`chu`, `owo`, `pika`],
      description: `Sends a random image of Pikachu`,
      examples: [`pikachu`],
      group: `animals`,
      memberName: `pikachu`,
      name: `pikachu`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/pikachuimg`, `link`)
  }
}
