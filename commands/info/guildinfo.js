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
    function checkBots (guild, member) {
      let memberCount = 0
      guild.members.forEach(member => {
        if (member.user.bot) memberCount++
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
      .addField(`Name:`, `**${msg.guild.name}**`, true)
      .addField(`Owner:`, `**${msg.guild.owner.user.tag}** (\`${msg.guild.owner.user.id}\`)`, false)
      .addField(`ID:`, `**${msg.guild.id}**`, false)
      .addField(`Total amount of channels:`, `**${msg.guild.channels.size - channCount(msg.guild, `category`)}**`, false)
      .addField(`Text channels:`, `**${channCount(msg.guild, `text`)}**`, false)
      .addField(`Voice channels:`, `**${channCount(msg.guild, `voice`)}**`, false)
      .addField(`Amount of members:`, `**${msg.guild.memberCount}**`, false)
      .addField(`Amount of bots:`, `**${checkBots(msg.guild)}**`, false)
      .addField(`Amount of humans:`, `**${msg.guild.memberCount - checkBots(msg.guild)}**`, false)
      .addField(`Region:`, `**${msg.guild.region}**`, false)
      .setFooter(`Guild created at:`)
      .setTimestamp(msg.guild.createdAt)

    return msg.say(embed)
  }
}
