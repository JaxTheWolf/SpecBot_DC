const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class GuildInfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: `guildinfo`,
      aliases: [
        `ginfo`,
        `guild_info`,
        `g_info`,
        `server_info`,
        `sinfo`,
        `s_info`
      ],
      group: `info`,
      memberName: `guildinfo`,
      description: `Shows information about the guild`,
      guildOnly: true,
      examples: [`guildinfo`]
    })
  }
  run (msg) {
    function checkBots (guild) {
      let botCount = 0
      guild.members.forEach(member => {
        if (member.user.bot) botCount++
      })
      return botCount
    }

    function checkMembers (guild) {
      let memberCount = 0
      guild.members.forEach(member => {
        if (!member.user.bot) memberCount++
      })
      return memberCount
    }

    function channCount (guild, type) {
      let chann = 0
      guild.channels.forEach(c => {
        if (c.type === type) chann++
      })
      return chann
    }

    const embed = new RichEmbed()
      .setColor(randomHexColor())
      .setTitle(`Here's some info about this guild:`)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setThumbnail(msg.guild.iconURL)
      .addField(`Name:`, msg.guild.name, false)
      .addField(`Owner:`, `${msg.guild.owner.user.tag} (${msg.guild.owner.user.id})`, false)
      .addField(`ID:`, msg.guild.id, false)
      .addField(`Number of text channels:`, channCount(msg.guild, `text`), false)
      .addField(`Number of voice channels:`, channCount(msg.guild, `voice`), false)
      .addField(`Amount of members (total):`, msg.guild.memberCount, false)
      .addField(`Bots:`, checkBots(msg.guild), false)
      .addField(`Humans:`, checkMembers(msg.guild), false)
      .addField(`Is this guild considered large? (250+ members):`, msg.guild.large, false)
      .addField(`Region:`, msg.guild.region, false)
      .setFooter(`Guild created at:`)
      .setTimestamp(msg.guild.createdAt)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(embed)
  }
}
