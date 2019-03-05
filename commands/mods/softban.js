const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)

module.exports = class SoftBanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `softban`,
      group: `mods`,
      memberName: `softban`,
      description: `Softban any members you wish. Similar to kicking a member`,
      userPermissions: [`BAN_MEMBERS`],
      clientPermissions: [`BAN_MEMBERS`],
      examples: [`softban userID Why not`],
      guildOnly: true,
      args: [
        {
          key: `member`,
          prompt: `Which member would you like to softban?`,
          type: `member`,
          error: `Invalid user mention (or ID). Please try again.`
        },
        {
          key: `reason`,
          prompt: `What should the reason be?`,
          default: `Softbanned by SpecBot.`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, reason }) {
    return member.ban({ days: 1, reason: reason })
      .then(m => msg.guild.unban(member.user, reason))
      .then(m => {
        if (reason !== `Softbanned by SpecBot.`) {
          log.Info(`Softbanned user ${member.user.tag}. Reason: ${reason}`)
        }
        return sendSuccessEmbed(msg, `🔨 Softbanned member **${member.user.tag}**`, `Reason: **${reason}**`)
      })
      .catch(err => {
        msg.delete().catch()
        return sendErrorEmbed(msg, `❌ Couldn't softban member **${member.user.tag}**`, `Reason: **${err.message}**`, 7500)
      })
  }
}
