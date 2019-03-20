const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
const { setPoints } = require(`../../libs/dbLibs`)

module.exports = class GiveCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Gives someone x points.`,
      examples: [`give 10 @user#0000`],
      group: `economy`,
      guildOnly: true,
      memberName: `give`,
      name: `give`,
      args: [
        {
          error: `You can only give 1 point or more!`,
          key: `amount`,
          min: 1,
          prompt: `How many point would you like to give?`,
          type: `integer`
        },
        {
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Who would you like to give these points?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { amount, user }) {
    const authorScore = this.client.getScore.get(msg.author.id, msg.guild.id)
    let userScore = this.client.getScore.get(user.id, msg.guild.id)
    if (!userScore) {
      userScore = {
        id: `${msg.guild.id}-${user.id}`,
        user: user.id,
        guild: msg.guild.id,
        points: 0,
        level: 1
      }
    }
    try {
      if (authorScore.points < amount) {
        return sendErrorEmbed(msg, `❌ Insufficent funds!`, ``, 7500)
      }
      setPoints(this.client, authorScore, `-`, amount)
      setPoints(this.client, userScore, `+`, amount)

      return sendSuccessEmbed(msg, `Gave user **${user.username} ${amount}** points!`, ``)
        .then(user.send(`**${msg.author.username}** gave you **${amount}** points! (Total: **${userScore.points}**)`))
    } catch (e) {
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
