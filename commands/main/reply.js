const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class ReplyCommand extends Command {
  constructor (client) {
    super(client, {
      name: `reply`,
      group: `main`,
      memberName: `reply`,
      description: `Replies with a Message.`,
      examples: [`reply`]
    })
  }
  run (msg) {
    msg.say(`It's working!`)
    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
