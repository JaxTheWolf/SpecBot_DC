const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`repeat`, `msg`],
      clientPermissions: [`MANAGE_MESSAGES`],
      description: `Repeats whatever you specify`,
      examples: [`say oko sux`],
      group: `main`,
      memberName: `say`,
      name: `say`,
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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.delete().then(msg.say(say))
  }
}
