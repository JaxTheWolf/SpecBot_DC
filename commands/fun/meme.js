const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class MemeCommand extends Command {
  constructor (client) {
    super(client, {
      name: `meme`,
      group: `fun`,
      memberName: `meme`,
      description: `Sends a random meme.`,
      examples: [`meme`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/meme`, `Images are fetched from https://some-random-api.ml`, `url`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
