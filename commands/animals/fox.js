const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class FoxCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `fex`,
        `foxxie`,
        `foxxo`,
        `foxy`,
        `orange_doggo`,
        `weird_doggo`
      ],
      description: `Sends a random image of a fox`,
      examples: [`fox`],
      group: `animals`,
      memberName: `fox`,
      name: `fox`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/foximg`, `link`)
  }
}
