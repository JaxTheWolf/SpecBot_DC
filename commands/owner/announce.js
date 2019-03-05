const { Command } = require(`discord.js-commando`)

module.exports = class AnnounceCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`ann`, `announcement`],
      description: `Annonuces a message to every guild the bot is in (Owner only)`,
      examples: [`announce Bot will be down for a few minutes!`],
      group: `owner`,
      memberName: `announce`,
      name: `announce`,
      ownerOnly: true,
      args: [
        {
          key: `message`,
          prompt: `What would you like to be announced?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { message }) {
    function isMuted (guild, client) {
      const muted = client.provider.get(guild, `muteann`, null)
      return !!(muted === false || muted === null)
    }

    function setDefAnnChannAndSendMessage (guild, client) {
      let defaultChann
      guild.channels.map(c => {
        let found = 0
        if (found === 0 &&
          c.type === `text` &&
          c.permissionsFor(client.user).has(`VIEW_CHANNEL`) === true &&
          c.permissionsFor(client.user).has(`SEND_MESSAGES`) === true) {
          found = 1
          defaultChann = c.id
        }
      })
      return this.client.provider.set(guild, `annchan`, defaultChann)
        .then(c => this.client.channels.get(c).send(message)
          .then(msg => msg.channel.send(`This message was sent to a "random" channel. Please consider adding an announcement channel via -setannchannel channelID or #channel.`)))
    }

    this.client.guilds.map(guild => {
      const channel = this.client.channels.get(this.client.provider.get(guild, `annchan`, null))

      if (isMuted(guild, this.client)) {
        try {
          channel.send(message)
        } catch (e) {
          setDefAnnChannAndSendMessage(guild, this.client)
        }
      }
    })
  }
}
