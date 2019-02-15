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
      description: `A base command to copy.`,
      examples: [`base`],
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
    fetchText(msg, `🎱`, `https://8ball.delegator.com/magic/JSON/${encodeURI(question)}`, `magic.answer`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
