const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      name: `ban`,
      group: `mods`,
      memberName: `ban`,
      description: `Ban any members you wish`,
      userPermissions: [`BAN_MEMBERS`],
      clientPermissions: [`BAN_MEMBERS`],
      examples: [`ban @someUser#0000 7 Naughty words`],
      guildOnly: true,
      args: [
        {
          key: `member`,
          prompt: `Which member would you like to ban?`,
          type: `member`,
          error: `Invalid user mention. Please try again.`
        },
        {
          key: `length`,
          prompt: `How long would you like to ban the member for? (in days, if not specified, defaults to 1)`,
          default: 1,
          type: `integer`,
          error: `Make sure that the ban length is a number!`
        },
        {
          key: `reason`,
          prompt: `What should the reason be?`,
          default: `Banned by SpecBot.`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, length, reason }) {
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
