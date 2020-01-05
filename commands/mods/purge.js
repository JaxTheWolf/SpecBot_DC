const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendSuccessEmbed } = require(`../../libs/embeds`)

module.exports = class PurgeCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`del`],
      clientPermissions: [`MANAGE_MESSAGES`],
      description: `Purges specified amount of messages`,
      examples: [`purge 52 @user#0000`, `purge 10`],
      group: `mods`,
      guildOnly: true,
      memberName: `purge`,
      name: `purge`,
      userPermissions: [`MANAGE_MESSAGES`],
      args: [
        {
          default: ``,
          error: `You can only delete 2 to 100 messages.`,
          key: `amount`,
          max: 100,
          min: 2,
          prompt: `How many messages would you like to delete?`,
          type: `integer`
        },
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Which member's messages would you like to delete?`,
          type: `member`
        }
      ]
    })
  }
  async run (msg, { member, amount }) {
    if (amount === ``) {
      return sendCMDUsage(msg, this, [`amount`, `(member)`])
    } else {
      msg.delete().catch()
      let messages = await msg.channel.fetchMessages({ limit: 100 })
      if (member !== ``) {
        messages = messages.array().filter(m => m.author.id === member.user.id)
        messages.length = amount
      } else {
        messages = messages.array()
        messages.length = amount
      }
      await msg.channel.bulkDelete(messages)
      return sendSuccessEmbed(msg, `Deleted ${messages.length} messages!`, ``, 7500)
    }
  }
}
