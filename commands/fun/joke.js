const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)

module.exports = class JokeCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a random joke`,
      examples: [`joke`],
      group: `fun`,
      memberName: `joke`,
      name: `joke`
    })
  }
  run (msg) {
    return fetchText(msg, `😆`, `https://some-random-api.ml/meme`, `text`)
  }
}
