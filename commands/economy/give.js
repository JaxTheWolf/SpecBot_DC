const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class GiveCommand extends Command {
  constructor (client) {
    super(client, {
      name: `give`,
      group: `economy`,
      memberName: `give`,
      description: `Gives someone x points.`,
      examples: [`give 10 @user#0000`],
      guildOnly: true,
      args: [
        {
          key: `amount`,
          prompt: `How many point would you like to give?`,
          type: `integer`,
          min: 1,
          error: `You can only give 1 point or more!`
        },
        {
          key: `user`,
          prompt: `Who would you like to give these points?`,
          type: `user`,
          error: `Invalid user mention. Please try again.`
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
    function setPoints (userScore, operation, amount) {
      switch (operation) {
      case `-`:
        userScore.points -= amount
        break
      case `+`:
        userScore.points += amount
      }
    }
    function updateLevel (userScore) {
      const userLevel = Math.floor(0.25 * Math.sqrt(userScore.points))
      userScore.level = userLevel < 1 ? 1 : userLevel
    }
    try {
      if (authorScore.points < amount) {
        return sendErrorEmbed(msg, `❌ Insufficent funds!`, ``, 7500)
      }
      setPoints(userScore, `+`, amount)
      setPoints(authorScore, `-`, amount)

      updateLevel(authorScore)
      updateLevel(userScore)

      this.client.setScore.run(userScore)
      this.client.setScore.run(authorScore)

      log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
      return sendSuccessEmbed(msg, `Gave user **${user.username} ${amount}** points!`, ``)
        .then(user.send(`**${msg.author.username}** gave you **${amount}** points! (Total: **${userScore.points}**)`))
    } catch (e) {
      msg.delete()
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
