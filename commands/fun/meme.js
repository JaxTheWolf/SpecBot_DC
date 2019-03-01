const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class MemeCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a random meme`,
      examples: [`meme`],
      group: `fun`,
      memberName: `meme`,
      name: `meme`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/meme`, `url`)
  }
}
