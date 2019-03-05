const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)

module.exports = class AnnchannelCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sets or shows a channel where SpecBot announcements will be sent`,
      examples: [`annchannel set #announcements`, `annchannel show`],
      group: `settings`,
      guildOnly: true,
      memberName: `annchannel`,
      name: `annchannel`,
      args: [
        {
          error: `Invalid operation! Please try again (set/show)`,
          key: `operation`,
          oneOf: [`set`, `show`],
          prompt: `What would you like to do? (set/show)`,
          type: `string`
        },
        {
          default: ``,
          error: `Invalid channel!`,
          key: `channel`,
          prompt: `What should the channel where SpecBot posts announcements be?`,
          type: `channel`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { channel, operation }) {
    if (channel !== `` && operation === `set`) {
      if (channel.type !== `text`) {
        msg.delete().catch()
        return sendErrorEmbed(msg, `❌ The announcement channel can only be a text channel!`, ``, 7500)
      } else {
        msg.client.provider.set(msg.guild, `annchan`, channel.id).then(c => {
          return sendSuccessEmbed(msg, `✅ The announcement channel has been successfully set to `, `<#${this.client.channels.get(c).id}>!`)
        })
      }
    } else if (channel === `` && operation === `show`) {
      return sendSuccessEmbed(msg, `The current announcement channel is`, `<#${this.client.provider.get(msg.guild, `annchan`)}>!`)
    }
  }
}
