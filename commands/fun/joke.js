const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class JokeCommand extends Command {
  constructor (client) {
    super(client, {
      name: `joke`,
      group: `fun`,
      memberName: `joke`,
      description: `Sends a random joke`,
      examples: [`joke`]
    })
  }
  run (msg) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `😆`, `https://some-random-api.ml/meme`, `text`)
  }
}
