const { Command } = require(`discord.js-commando`)
const { sendSuccessEmbed } = require(`../../libs/embeds`)

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
          min: 2,
          max: 100,
          error: `You can only delete 2 to 100 messages.`
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
