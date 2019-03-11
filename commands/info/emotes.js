const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed } = require(`../../libs/embeds`)

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
        return sendErrorEmbed(msg, `❌ This server doesn't have any custom emotes!`, ``, 7500)
      default:
        return msg.say(emojiList)
      }
    }

    return fetchEmojis(msg.guild)
  }
}
