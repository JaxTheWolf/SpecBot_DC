const { Command } = require(`discord.js-commando`)
const randomHexColor = require(`random-hex-color`)
const { sendErrorEmbed, sendSimpleEmbededMessage, sendSuccessEmbed } = require(`../../libs/embeds`)

module.exports = class WelcomeChannel extends Command {
  constructor (client) {
    super(client, {
      description: `Use this to set the channel where the invite messages will be sent or to disable them.`,
      examples: [`welcome`, `welcome show`, `welcome disable`, `welcome set # welcome`, `welcome set 570179101340262656`],
      group: `settings`,
      memberName: `welcomechannel`,
      name: `welcome`,
      args: [
        {
          default: `show`,
          error: `Invalid action. Reply with either set, show, or disable`,
          key: `action`,
          oneOf: [`disable`, `set`, `show`],
          prompt: `What action would you like to perform? (set, show, disable)`,
          type: `string`
        },
        {
          default: ``,
          error: `Please enter a valid channel (#channel) or channel ID`,
          key: `channel`,
          prompt: `What should the welcome channel be?`,
          type: `channel`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, channel }) {
    const joinchann = this.client.provider.get(msg.guild, `joinchann`, null)

    function isText (channel) {
      return channel.type === `text`
    }

    switch (action) {
    case `set`:
      if (isText(channel) && joinchann === null) {
        return this.client.provider.set(msg.guild, `joinchann`, channel.id).then(id => sendSuccessEmbed(msg, `✅ The welcome channel has been set to`, `<#${id}>`))
          .catch(e => {
            sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
          })
      } else if (joinchann !== null) {
        return sendErrorEmbed(msg, `❌ You already have the join channel set!`)
      } else {
        return sendErrorEmbed(msg, `❌ Invalid channel!`, ``)
      }
    case `disable`:
      if (joinchann === null) {
        return sendErrorEmbed(msg, `❌ The welcome function is already disabled!`, ``)
      } else {
        return this.client.provider.remove(msg.guild, `joinchann`)
          .then(() => {
            sendSuccessEmbed(msg, `✅ The join channel has been sucessfully disabled!`, ``)
          })
          .catch(e => {
            sendErrorEmbed(msg, `❌ An error has occured`, e.message)
          })
      }
    default:
      if (joinchann !== null) {
        return sendSimpleEmbededMessage(msg, `<#${joinchann}>!`, randomHexColor().replace(`#`, `0x`), `The current welcome channel is`)
      } else {
        return sendErrorEmbed(msg, `❌ The welcome channel isn't set!`, ``)
      }
    }
  }
}
