const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super(client, {
      name: `avatar`,
      aliases: [`pfp`],
      group: `main`,
      memberName: `avatar`,
      description: `Shows your or mentioned user's avatar.`,
      examples: [`avatar @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's avatar would you like to see?`,
          type: `user`,
          default: ``,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  run (msg, { user }) {
    const embed = new RichEmbed()

    if (user === ``) {
      embed
        .setTitle(`Here's your avatar:`)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setImage(msg.author.displayAvatarURL)
        .setColor(randomHexColor())
    } else {
      embed
        .setTitle(`Here's ${user.username}'s avatar:`)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setImage(user.displayAvatarURL)
        .setColor(randomHexColor())
    }
    msg.say(embed)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
