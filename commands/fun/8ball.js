const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class EightBallCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Ask a question and 8ball will answer`,
      examples: [`-8ball Am I dumb?`],
      group: `fun`,
      memberName: `8ball`,
      name: `8ball`,
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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchText(msg, `🎱`, `https://8ball.delegator.com/magic/JSON/${encodeURI(question)}`, `magic.answer`)
  }
}
