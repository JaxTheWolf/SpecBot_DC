const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

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
          default: ``,
          key: `question`,
          prompt: `What would you like to ask?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { question }) {
    if (question === ``) {
      return sendCMDUsage(msg, this, `question`)
    } else {
      return fetchText(msg, `🎱`, `https://8ball.delegator.com/magic/JSON/${encodeURI(question)}`, `magic.answer`)
    }
  }
}
