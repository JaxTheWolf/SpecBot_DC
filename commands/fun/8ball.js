const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/textFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class EightBallCommand extends Command {
  constructor (client) {
    super(client, {
      name: `8ball`,
      group: `fun`,
      memberName: `8ball`,
      description: `Ask a question and 8ball will answer`,
      examples: [`-8ball Am I dumb?`],
      args: [
        {
          key: `question`,
          prompt: `What would you like to ask?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { question }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🎱`, `https://8ball.delegator.com/magic/JSON/${encodeURI(question)}`, `magic.answer`)
  }
}
