const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { RichEmbed } = require(`discord.js`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class GuildListCommand extends Command {
  constructor (client) {
    super(client, {
      name: `guildlist`,
      aliases: [`guilds`, `glist`, `servers`, `slist`],
      group: `info`,
      memberName: `guildlist`,
      description: `Lists all the guilds the bot is in`,
      examples: [`guildlist`]
    })
  }
  run (msg) {
    const guildlist = this.client.guilds.map(g => g.name).join(`\n`)
    const embed = new RichEmbed()
      .setColor(randomHexColor())
      .setTitle(`Here's the list of guilds the bot is in:`)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setDescription(guildlist)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(embed)
  }
}
