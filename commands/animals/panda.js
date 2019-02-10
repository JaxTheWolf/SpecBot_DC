const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/animalImageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PandaCommand extends Command {
  constructor (client) {
    super(client, {
      name: `panda`,
      aliases: [`pandabear`, `bamboo_muncher`],
      group: `animals`,
      memberName: `panda`,
      description: `Sends a random image of a panda.`,
      examples: [`panda`]
    })
  }
  run (msg) {
    sendImg(msg, `https://some-random-api.ml/pandaimg`, `Images are fetched from https://some-random-api.ml`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
