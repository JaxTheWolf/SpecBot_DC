const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/textFetcher`)
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
    fetchText(msg, `😆`, `https://some-random-api.ml/meme`, `text`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
