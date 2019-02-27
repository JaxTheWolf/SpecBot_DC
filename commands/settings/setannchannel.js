const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class SetAnnChannelCommand extends Command {
  constructor (client) {
    super(client, {
      name: `setannouncementchannel`,
      aliases: [`setannchannel`],
      group: `settings`,
      memberName: `setannchannel`,
      description: `Sets a channel where SpecBot announcements will be sent`,
      examples: [`setannouncementchannel #announcements`, `setannouncementchannel 533369378193014805`],
      guildOnly: true,
      args: [
        {
          key: `channel`,
          prompt: `What should the channel where SpecBot posts announcements be?`,
          type: `channel`,
          error: `Invalid channel!`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { channel }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (channel.type !== `text`) {
      return msg.reply(`The announcement channel can only be a text channel!`)
    } else {
      msg.client.provider.set(msg.guild, `annchan`, channel.id).then(c => {
        return msg.reply(`The announcement channel has been successfully set to <#${this.client.channels.get(c).id}>!`)
      })
    }
  }
}
