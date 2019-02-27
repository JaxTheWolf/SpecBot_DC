const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class AnnchannelCommand extends Command {
  constructor (client) {
    super(client, {
      name: `annchannel`,
      aliases: [`annchannel`],
      group: `settings`,
      memberName: `annchannel`,
      description: `Sets or shows a channel where SpecBot announcements will be sent`,
      examples: [`annchannel set #announcements`, `annchannel show`],
      guildOnly: true,
      args: [
        {
          key: `operation`,
          prompt: `What would you like to do? (set/show)`,
          type: `string`,
          oneOf: [`set`, `show`],
          error: `Invalid operation! Please try again (set/show)`
        },
        {
          key: `channel`,
          prompt: `What should the channel where SpecBot posts announcements be?`,
          type: `channel`,
          default: ``,
          error: `Invalid channel!`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { channel, operation }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (channel !== `` && operation === `set`) {
      if (channel.type !== `text`) {
        return msg.reply(`The announcement channel can only be a text channel!`)
      } else {
        msg.client.provider.set(msg.guild, `annchan`, channel.id).then(c => {
          return msg.reply(`The announcement channel has been successfully set to <#${this.client.channels.get(c).id}>!`)
        })
      }
    } else if (channel === `` && operation === `show`) {
      return msg.reply(`The current announcement channel is <#${this.client.provider.get(msg.guild, `annchan`)}>!`)
    }
  }
}
