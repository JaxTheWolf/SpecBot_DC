const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
const https = require(`https`)
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
    const uriQuestion = encodeURI(question)
    const uri = `https://8ball.delegator.com/magic/JSON/${uriQuestion}`

    https
      .get(uri, function onDone (response) {
        let data = ``
        response.on(`data`, chunk => {
          data += chunk
        })
        response.on(`end`, () => {
          msg.say(`🎱 | ${JSON.parse(data).magic.answer}`)
        })
      })
      .on(`error`, err => {
        msg.say(`An error has occured. (${err.message})`)
      })
    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
