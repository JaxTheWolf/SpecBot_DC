const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class FoxCommand extends Command {
  constructor (client) {
    super(client, {
      name: `fox`,
      aliases: [`foxxo`, `foxxie`, `fex`, `orange_doggo`, `foxy`, `weird_doggo`],
      group: `animals`,
      memberName: `fox`,
      description: `Sends a random image of a fox.`,
      examples: [`fox`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/foximg`, `Images are fetched from https://some-random-api.ml`, `link`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
