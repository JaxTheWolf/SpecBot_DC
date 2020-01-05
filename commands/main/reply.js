const { Command } = require(`discord.js-commando`)

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
    return msg.say(`It's working!`)
  }
}
