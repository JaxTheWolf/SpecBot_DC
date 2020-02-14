const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

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
          type: `string`,
          default: ``
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
    if (operation === ``) {
      return sendCMDUsage(msg, this, [`channel`, `operation (set, show)`])
    } else {
      switch (operation) {
      case `set`:
        if (channel.type !== `text`) {
          return sendErrorEmbed(msg, `❌ The announcement channel can only be a text channel!`, ``, 7500)
        } else {
          msg.client.provider.set(msg.guild, `annchan`, channel.id).then(c => {
            return sendSuccessEmbed(msg, `✅ The announcement channel has been successfully set to `, `<#${this.client.channels.get(c).id}>!`)
          })
        }
        break
      case `show`:
        const id = this.client.provider.get(msg.guild, `annchan`, null)
        if (id === null) {
          return sendErrorEmbed(msg, `❌ The announcement channel isn't set!`)
        } else {
          return sendSuccessEmbed(msg, `The current announcement channel is`, `<#${this.client.provider.get(msg.guild, `annchan`)}>!`)
        }
      }
    }
  }
}
