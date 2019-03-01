const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class ReplyCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Replies with a Message`,
      examples: [`reply`],
      group: `main`,
      memberName: `reply`,
      name: `reply`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`It's working!`)
  }
}
