const { Command } = require(`discord.js-commando`)

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
    return this.client.generateInvite([ `SEND_MESSAGES`, `MANAGE_MESSAGES`, `KICK_MEMBERS`, `BAN_MEMBERS` ])
      .then(link => msg.say(`Here's the invite link! ${link}`)
        .then(msg.say(`I hope you'll enjoy the bot!`)))
  }
}
