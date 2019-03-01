const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class XYZCommand extends Command {
  constructor (client) {
    super(client, {
      name: `emotes`,
      group: `info`,
      memberName: `emotes`,
      description: `Sends a message containing all server emotes`,
      guildOnly: true,
      examples: [`emotes`]
    })
  }
  run (msg) {
    function fetchEmojis (guild) {
      const emojiList = guild.emojis.map(e => e.toString()).join(` `)

      switch (emojiList) {
      case (``):
        msg.delete()
        return sendErrorEmbed(msg, `❌ This server doesn't have any custom emotes!`, ``, 7500)
      default:
        return msg.say(emojiList)
      }
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchEmojis(msg.guild)
  }
}
