const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      name: `say`,
      aliases: [`repeat`, `msg`],
      group: `main`,
      memberName: `say`,
      description: `Repeats whatever you specify.`,
      examples: [`say oko sux`],
      clientPermissions: [`MANAGE_MESSAGES`],
      args: [
        {
          key: `say`,
          prompt: `What would you like the bot to repeat?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { say }) {
    msg.delete()
    msg.say(say)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
