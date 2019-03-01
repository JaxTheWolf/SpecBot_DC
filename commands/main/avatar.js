const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendEmbeddedImage } = require(`../../libs/embeds`)
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
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (user === ``) {
      return sendEmbeddedImage(msg, ``, msg.author.displayAvatarURL, randomHexColor().replace(`#`, `0x`), `Here's your avatar!`)
    } else {
      return sendEmbeddedImage(msg, ``, user.displayAvatarURL, randomHexColor().replace(`#`, `0x`), `Here's ${user.username}'s avatar!`)
    }
  }
}
