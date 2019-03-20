const { Command } = require(`discord.js-commando`)
const { sendSimpleEmbededMessage, hexColorWith0x } = require(`../../libs/embeds`)

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
    const guildlist = this.client.guilds.map(g => `**${g.name}**\nMember count: **${g.memberCount}**`).join(`\n`)

    return sendSimpleEmbededMessage(msg, guildlist, hexColorWith0x(), `Here's the list of guilds the bot is in:`)
  }
}
