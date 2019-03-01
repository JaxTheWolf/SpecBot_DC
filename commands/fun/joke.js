const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `😆`, `https://some-random-api.ml/meme`, `text`)
  }
}
