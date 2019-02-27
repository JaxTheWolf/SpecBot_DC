const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class BirdCommand extends Command {
  constructor (client) {
    super(client, {
      name: `bird`,
      aliases: [`birb`, `birdie`],
      group: `animals`,
      memberName: `bird`,
      description: `Sends a random image of a bird`,
      examples: [`bird`]
    })
  }
  run (msg) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/birbimg`, `link`)
  }
}
