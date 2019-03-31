const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

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
          default: ``,
          key: `message`,
          prompt: `What would you like to be announced?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { message }) {
    const cli = this.client
    function isMuted (guild) {
      const muted = cli.provider.get(guild, `muteann`, null)
      return !!(muted === null || false)
    }

    function setDefAnnChannAndSendMessage (guild) {
      let defaultChann
      guild.channels.map(c => {
        let found = 0
        if (found === 0 &&
          c.type === `text` &&
          c.permissionsFor(cli.user).has(`VIEW_CHANNEL`) === true &&
          c.permissionsFor(cli.user).has(`SEND_MESSAGES`) === true) {
          found = 1
          defaultChann = c.id
        }
      })
      return cli.provider.set(guild, `annchan`, defaultChann)
        .then(c => cli.channels.get(c).send(message)
          .then(msg => msg.channel.send(`This message was sent to a "random" channel. Please consider adding an announcement channel via ${msg.guild.commandPrefix}annchannel set #channel or channelID.`)))
    }
    if (message === ``) {
      return sendCMDUsage(msg, this, `message`)
    } else {
      cli.guilds.map(guild => {
        const channel = cli.channels.get(cli.provider.get(guild, `annchan`, null))

        if (isMuted(guild)) {
          try {
            channel.send(message)
          } catch (e) {
            setDefAnnChannAndSendMessage(guild)
          }
        }
      })
    }
  }
}
