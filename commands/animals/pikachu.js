const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

module.exports = class PikachuCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`chu`, `owo`, `pika`],
      description: `Sends a random image of Pikachu`,
      examples: [`pikachu`],
      group: `animals`,
      memberName: `pikachu`,
      name: `pikachu`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/pikachuimg`, `link`)
  }
}
