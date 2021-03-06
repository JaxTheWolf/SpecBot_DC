const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
const { setMoney } = require(`../../libs/dbLibs`)

module.exports = class GiveCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Gives someone x Spec$.`,
      examples: [`give 10 @user#0000`],
      group: `economy`,
      guildOnly: true,
      memberName: `give`,
      name: `give`,
      args: [
        {
          default: ``,
          error: `You can only give 1 Spec$ or more!`,
          key: `amount`,
          min: 1,
          prompt: `How many Spec$ would you like to give?`,
          type: `integer`
        },
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Who would you like to give these Spec$?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { amount, user }) {
    if (amount === `` || user === ``) {
      return sendCMDUsage(msg, this, [`amount`, `user`])
    } else {
      const authorScore = this.client.getScore.get(msg.author.id, msg.guild.id)
      const userScore = this.client.getScore.get(user.id, msg.guild.id) || {
        id: `${msg.guild.id}-${user.id}`,
        user: user.id,
        guild: msg.guild.id,
        points: 0,
        level: 1,
        money: 5
      }
      if (authorScore.id === userScore.id) {
        return sendErrorEmbed(msg, `❌ You cannot give Spec$ to yourself!`, ``, 7500)
      }
      try {
        if (authorScore.money < amount) {
          return sendErrorEmbed(msg, `❌ Insufficient funds!`, ``, 7500)
        }

        setMoney(this.client, userScore, `+`, amount)
        setMoney(this.client, authorScore, `-`, amount)

        return sendSuccessEmbed(msg, `Gave user **${user.username} ${amount}** Spec$!`, ``)
          .then(user.send(`**${msg.author.username}** gave you **${amount}** Spec$! (Total: **${userScore.money}**)`))
      } catch (e) {
        return sendErrorEmbed(msg, `An error has occurred`, e.message, 7500)
      }
    }
  }
}
