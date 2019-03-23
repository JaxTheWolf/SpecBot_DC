const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      clientPermissions: [`BAN_MEMBERS`],
      description: `Ban any members you wish`,
      examples: [`ban @someUser#0000 7 Naughty words`],
      group: `mods`,
      guildOnly: true,
      memberName: `ban`,
      name: `ban`,
      userPermissions: [`BAN_MEMBERS`],
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Which member would you like to ban?`,
          type: `member`
        },
        {
          default: 1,
          error: `Make sure that the ban length is a number!`,
          key: `length`,
          prompt: `How long would you like to ban the member for? (in days, if not specified, defaults to 1)`,
          type: `integer`
        },
        {
          default: `Banned by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, length, reason }) {
    if (member === `` || length === `` || reason === ``) {
      return sendCMDUsage(msg, this, [`member`, `(length) (default: 1)`, `(reason) (default: Banned by SpecBot)`])
    } else {
      return member.ban({ days: length, reason: reason })
        .then(m => {
          if (reason !== `Banned by SpecBot.`) {
            log.Info(`Banned member "${m.user.tag}" from guild "${msg.guild.name}" for "${length}" days. Reason: "${reason}"`)
          }
          return sendSuccessEmbed(msg, `🔨  Member **${m.user.tag}** was banned for **${length} ${length === 0 || length > 1 ? `days` : `day`}**`, `Reason: **${reason}**`)
        })
        .catch(err => {
          return sendErrorEmbed(msg, `❌ Couldn't ban member **${member.user.tag}**`, `Reason: **${err.message}**`, 7500)
        })
    }
  }
}
