const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

module.exports = class PandaCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`bamboo_muncher`, `pandabear`],
      description: `Sends a random image of a panda`,
      examples: [`panda`],
      group: `animals`,
      memberName: `panda`,
      name: `panda`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/pandaimg`, `link`)
  }
}
