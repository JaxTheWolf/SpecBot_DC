const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class UnbanCommand extends Command {
  constructor (client) {
    super(client, {
      clientPermissions: [`BAN_MEMBERS`],
      description: `Unban any members you wish`,
      examples: [`unban userID Why not`],
      group: `mods`,
      guildOnly: true,
      memberName: `unban`,
      name: `unban`,
      userPermissions: [`BAN_MEMBERS`],
      args: [
        {
          default: ``,
          error: `Invalid user mention (or ID). Please try again.`,
          key: `user`,
          prompt: `Which member would you like to unban?`,
          type: `user`
        },
        {
          default: `Unbanned by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { user, reason }) {
    if (user === `` || reason === ``) {
      return sendCMDUsage(msg, this, [`user`, `(reason) (default: Kicked by SpecBot)`])
    } else {
      return msg.guild
        .unban(user, reason)
        .then(() => {
          if (reason !== `Unbanned by SpecBot.`) {
            log.Info(`Unbanned user ${user.tag}. Reason: ${reason}`)
          }
          msg.reply(`🔨 | Unbanned user **${user.tag}**. Reason: **${reason}**.`)
          return sendSuccessEmbed(msg, `🔨 Unbanned user **${user.tag}**`, `Reason: **${reason}**`)
        })
        .catch(err => {
          return sendErrorEmbed(msg, `❌ Couldn't unban user **${user.tag}**`, `Reason: **${err.message}**`, 7500)
        })
    }
  }
}
