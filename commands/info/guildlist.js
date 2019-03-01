const log = require(`node-file-logger`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendSimpleEmbededMessage } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class GuildListCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`guilds`, `glist`, `servers`, `slist`],
      description: `Lists all the guilds the bot is in`,
      examples: [`guildlist`],
      group: `info`,
      memberName: `guildlist`,
      name: `guildlist`
    })
  }
  run (msg) {
    const guildlist = this.client.guilds.map(g => g.name).join(`\n`)
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendSimpleEmbededMessage(msg, guildlist, randomHexColor().replace(`#`, `0x`), `Here's the list of guilds the bot is in:`)
  }
}
