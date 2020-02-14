const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class KickCommand extends Command {
  constructor (client) {
    super(client, {
      clientPermissions: [`KICK_MEMBERS`],
      description: `Kick any members you wish`,
      examples: [`kick @someUser#0000 Naughty words`],
      group: `mods`,
      guildOnly: true,
      memberName: `kick`,
      name: `kick`,
      userPermissions: [`KICK_MEMBERS`],
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Which member would you like to kick?`,
          type: `member`
        },
        {
          default: `Kicked by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, reason }) {
    if (member === `` || reason === ``) {
      return sendCMDUsage(msg, this, [`member`, `(reason) (default: Kicked by SpecBot)`])
    } else {
      return member.kick(reason)
        .then(m => {
          if (reason !== `Kicked by SpecBot.`) {
            log.Info(`Kicked member "${m.user.tag}" from guild "${msg.guild.name}". Reason: "${reason}"`)
          }
          return sendSuccessEmbed(msg, `👢 Member **${m.user.tag}** was kicked.`, `Reason: **${reason}**`)
        })
        .catch(err => {
          return sendErrorEmbed(msg, `❌ Couldn't kick member **${member.user.tag}**`, `Reason: **${err.message}**`, 7500)
        })
    }
  }
}
