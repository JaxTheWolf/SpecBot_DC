const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PurgeCommand extends Command {
  constructor (client) {
    super(client, {
      name: `purge`,
      aliases: [`del`],
      group: `main`,
      memberName: `purge`,
      description: `Purges specified amount of messages.`,
      examples: [`purge @user#0000 52`, `purge 10`],
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
    let messages = await msg.channel.fetchMessages({ limit: 100 })
    const user = member.user
    if (!msg.guild.members.get(msg.author.id).hasPermission(`MANAGE_MESSAGES`, false, true, true)) {
      return msg.say(`You don't have required permissions for this action!`)
    } else {
      if (member !== ``) {
        messages = messages.array().filter(m => m.author.id === user.id)
        messages.length = amount
      } else {
        messages = messages.array()
        messages.length = amount + 1
      }

      await msg.channel.bulkDelete(messages)
      await msg
        .say(`Deleted ${messages.length} messages!`)
        .then(m => m.delete(2500))
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
