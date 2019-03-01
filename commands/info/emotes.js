const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class XYZCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a message containing all server emotes`,
      examples: [`emotes`],
      group: `info`,
      guildOnly: true,
      memberName: `emotes`,
      name: `emotes`
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

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return fetchEmojis(msg.guild)
  }
}
