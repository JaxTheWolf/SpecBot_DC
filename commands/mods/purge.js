const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendSuccessEmbed } = require(`../../libs/embeds`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const { basename } = require(`path`)

module.exports = class PurgeCommand extends Command {
  constructor (client) {
    super(client, {
      name: `purge`,
      aliases: [`del`],
      group: `mods`,
      memberName: `purge`,
      description: `Purges specified amount of messages`,
      examples: [`purge 52 @user#0000`, `purge 10`],
      userPermissions: [`MANAGE_MESSAGES`],
      clientPermissions: [`MANAGE_MESSAGES`],
      guildOnly: true,
      args: [
        {
          key: `amount`,
          prompt: `How many messages would you like to delete?`,
          type: `integer`,
          min: 1,
          max: 99,
          error: `You can only delete 1 to 99 messages.`
        },
        {
          key: `member`,
          prompt: `Which member's messages would you like to delete?`,
          type: `member`,
          default: ``,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  async run (msg, { member, amount }) {
    msg.delete()

    await log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    let messages = await msg.channel.fetchMessages({ limit: 99 })
    if (member !== ``) {
      messages = messages.array().filter(m => m.author.id === member.user.id)
      messages.length = amount + 1
    } else {
      messages = messages.array()
      messages.length = amount + 1
    }

    await msg.channel.bulkDelete(messages)
    return sendSuccessEmbed(msg, `Deleted ${messages.length - 1} messages!`, ``, 7500)
  }
}
