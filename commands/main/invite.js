const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class InviteCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`inv`, `summon`],
      description: `Replies with the bot's oauth2 link`,
      examples: [`invite`],
      group: `main`,
      memberName: `invite`,
      name: `invite`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return this.client.generateInvite([ `SEND_MESSAGES`, `MANAGE_MESSAGES`, `KICK_MEMBERS`, `BAN_MEMBERS` ])
      .then(link => msg.say(`Here's the invite link! ${link}`)
        .then(msg.say(`I hope you'll enjoy the bot!`)))
  }
}
