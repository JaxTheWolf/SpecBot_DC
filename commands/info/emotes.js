const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
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
      return emojiList === `` ? `This server doesn't have any custom emotes.` : emojiList
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(fetchEmojis(msg.guild))
  }
}
