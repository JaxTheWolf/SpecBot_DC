const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class UnbanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `unban`,
      group: `mods`,
      memberName: `unban`,
      description: `Unban any members you wish`,
      userPermissions: [`BAN_MEMBERS`],
      clientPermissions: [`BAN_MEMBERS`],
      examples: [`unban userID Why not`],
      guildOnly: true,
      args: [
        {
          key: `user`,
          prompt: `Which member would you like to unban?`,
          type: `user`,
          error: `Invalid user mention (or ID). Please try again.`
        },
        {
          key: `reason`,
          prompt: `What should the reason be?`,
          default: `Unbanned by SpecBot.`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { user, reason }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.guild
      .unban(user, reason)
      .then(() => {
        if (reason !== `Unbanned by SpecBot.`) {
          log.Info(`Unbanned user ${user.tag}. Reason: ${reason}`)
        }
        msg.reply(`🔨 | Unbanned user **${user.tag}**. Reason: **${reason}**.`)
      })
      .catch(err => {
        msg.say(`Couldn't unban user **${user.tag}**. Reason: **${err.message}**`)
      })
  }
}
