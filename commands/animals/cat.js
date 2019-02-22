const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class CatCommand extends Command {
  constructor (client) {
    super(client, {
      name: `cat`,
      aliases: [`kitty`, `puss`, `pussy`, `cat`, `kitten`, `pussycat`],
      group: `animals`,
      memberName: `cat`,
      description: `Sends a random image of a cat.`,
      examples: [`cat`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/catimg`, `link`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
