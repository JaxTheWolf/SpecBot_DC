const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

module.exports = class RedPandaCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`redbamboo_muncher`, `redfatdoggo`],
      description: `Sends a random image of a red panda`,
      examples: [`redpanda`],
      group: `animals`,
      memberName: `redpanda`,
      name: `redpanda`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/redpandaimg`, `link`)
  }
}
