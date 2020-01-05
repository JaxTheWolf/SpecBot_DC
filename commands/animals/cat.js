const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

module.exports = class CatCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`kitty`, `puss`, `pussy`, `cat`, `kitten`, `pussycat`],
      description: `Sends a random image of a cat`,
      examples: [`cat`],
      group: `animals`,
      memberName: `cat`,
      name: `cat`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/catimg`, `link`)
  }
}
