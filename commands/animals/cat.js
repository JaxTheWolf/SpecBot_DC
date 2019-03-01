const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class CatCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`kitty`, `puss`, `pussy`, `cat`, `kitten`, `pussycat`],
      description: `Sends a random image of a cat`,
      examples: [`cat`],
      group: `animals`,
      memberName: `cat`,
      name: `cat`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/catimg`, `link`)
  }
}
