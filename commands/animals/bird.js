const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

module.exports = class BirdCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`birb`, `birdie`],
      description: `Sends a random image of a bird`,
      examples: [`bird`],
      group: `animals`,
      memberName: `bird`,
      name: `bird`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/birbimg`, `link`)
  }
}
