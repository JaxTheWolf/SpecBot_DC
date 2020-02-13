const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)

module.exports = class GuildInfoCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `g_info`,
        `ginfo`,
        `guild_info`,
        `s_info`,
        `server_info`,
        `sinfo`
      ],
      description: `Shows information about the guild`,
      examples: [`guildinfo`],
      group: `info`,
      guildOnly: true,
      memberName: `guildinfo`,
      name: `guildinfo`
    })
  }
  run (msg) {
    const checkBots = (guild) => {
      let memberCount = 0
      guild.members.forEach(member => {
        if (member.user.bot) memberCount++
      })
      return memberCount
    }
    const channCount = (guild, type) => {
      let chann = 0
      guild.channels.forEach(c => {
        if (c.type === type) chann++
      })
      return chann
    }

    const embed = new RichEmbed()
      .addField(`Name`, msg.guild.name, true)
      .addField(`Owner`, `${msg.guild.owner.user.tag} (\`${msg.guild.owner.user.id}\`)`, true)
      .addField(`Created`, msg.guild.createdAt.toLocaleString(), true)
      .addField(`Total channels`, msg.guild.channels.size - channCount(msg.guild, `category`), true)
      .addField(`Text channels`, channCount(msg.guild, `text`), true)
      .addField(`Voice channels`, channCount(msg.guild, `voice`), true)
      .addField(`Total members`, msg.guild.memberCount, true)
      .addField(`Bots`, checkBots(msg.guild), true)
      .addField(`Humans`, msg.guild.memberCount - checkBots(msg.guild), true)
      .addField(`Region`, msg.guild.region, true)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL)
      .setColor(randomHexColor())
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Here's some info about this guild`)
      .setFooter(`ID: ${msg.guild.id}`)
      .setTimestamp(new Date())

    return msg.say({ embed })
  }
}
