const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

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
    return sendImg(msg, `https://some-random-api.ml/foximg`, `link`)
  }
}
