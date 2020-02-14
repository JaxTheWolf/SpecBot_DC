const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class SoftBanCommand extends Command {
  constructor (client) {
    super(client, {
      clientPermissions: [`BAN_MEMBERS`],
      description: `Softban any members you wish. Similar to kicking a member`,
      examples: [`softban userID Why not`],
      group: `mods`,
      guildOnly: true,
      memberName: `softban`,
      name: `softban`,
      userPermissions: [`BAN_MEMBERS`],
      args: [
        {
          default: ``,
          error: `Invalid user mention (or ID). Please try again.`,
          key: `member`,
          prompt: `Which member would you like to softban?`,
          type: `member`
        },
        {
          default: `Softbanned by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, reason }) {
    if (member === `` || reason === ``) {
      return sendCMDUsage(msg, this, [`member`, `(reason) (default: Softbanned by SpecBot)`])
    } else {
      return member.ban({ days: 1, reason: reason })
        .then(m => msg.guild.unban(member.user, reason))
        .then(m => {
          if (reason !== `Softbanned by SpecBot.`) {
            log.Info(`Softbanned user ${member.user.tag}. Reason: ${reason}`)
          }
          return sendSuccessEmbed(msg, `🔨 Softbanned member **${member.user.tag}**`, `Reason: **${reason}**`)
        })
        .catch(err => {
          return sendErrorEmbed(msg, `❌ Couldn't softban member **${member.user.tag}**`, `Reason: **${err.message}**`, 7500)
        })
    }
  }
}
