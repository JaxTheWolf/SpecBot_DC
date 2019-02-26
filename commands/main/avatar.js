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
      description: `Shows your or mentioned user's avatar`,
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
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())
    if (user === ``) {
      embed
        .setTitle(`Here's your avatar:`)
        .setImage(msg.author.displayAvatarURL)
    } else {
      embed
        .setTitle(`Here's ${user.username}'s avatar:`)
        .setImage(user.displayAvatarURL)
    }
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(embed)
  }
}
