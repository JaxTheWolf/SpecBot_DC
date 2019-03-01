const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendSimpleEmbededMessage } = require(`../../libs/embeds`)
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
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendSimpleEmbededMessage(msg, guildlist, randomHexColor().replace(`#`, `0x`), `Here's the list of guilds the bot is in:`)
  }
}
