const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class InviteCommand extends Command {
  constructor (client) {
    super(client, {
      name: `invite`,
      aliases: [`inv`, `summon`],
      group: `main`,
      memberName: `invite`,
      description: `Replies with the bot's oauth2 link.`,
      examples: [`invite`]
    })
  }
  run (msg) {
    this.client
      .generateInvite([`SEND_MESSAGES`, `MANAGE_MESSAGES`])
      .then(link => msg.say(`Here's the invite link! ${link}`).then(msg.say(`I hope you'll enjoy the bot!`)))

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
