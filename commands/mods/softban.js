const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

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
    const memberTag = member.user.tag
    member.ban({ days: 1, reason: reason })
      .then(m => msg.guild.unban(member.user, reason))
      .then(m => {
        if (reason !== `Softbanned by SpecBot.`) {
          log.Info(`Softbanned user ${memberTag}. Reason: ${reason}`)
        }
        msg.reply(`🔨 | Softbanned member **${memberTag}**. Reason: **${reason}**`)
      }).catch(err => {
        msg.say(`Couldn't softban member **${memberTag}**. Reason: **${err.message}**`)
      })
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
