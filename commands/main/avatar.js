const log = require(`node-file-logger`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendEmbeddedImage } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`pfp`],
      description: `Shows your or mentioned user's avatar`,
      examples: [`avatar @oko123#8509`],
      group: `main`,
      memberName: `avatar`,
      name: `avatar`,
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Which user's avatar would you like to see?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (user === ``) {
      return sendEmbeddedImage(msg, ``, msg.author.displayAvatarURL, randomHexColor().replace(`#`, `0x`), `Here's your avatar!`)
    } else {
      return sendEmbeddedImage(msg, ``, user.displayAvatarURL, randomHexColor().replace(`#`, `0x`), `Here's ${user.username}'s avatar!`)
    }
  }
}
