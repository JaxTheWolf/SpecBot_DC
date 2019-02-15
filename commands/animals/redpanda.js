const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class RedPandaCommand extends Command {
  constructor (client) {
    super(client, {
      name: `redpanda`,
      aliases: [`redfatdoggo`, `redbamboo_muncher`],
      group: `animals`,
      memberName: `redpanda`,
      description: `Sends a random image of a red panda.`,
      examples: [`redpanda`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/redpandaimg`, `Images are fetched from https://some-random-api.ml`, `link`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
