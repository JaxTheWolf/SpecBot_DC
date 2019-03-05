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
    function checkMembers (guild, member) {
      let memberCount = 0

      switch (member) {
      case `user`:
        guild.members.forEach(member => {
          if (!member.user.bot) memberCount++
        })
        break
      case `bot`:
        guild.members.forEach(member => {
          if (member.user.bot) memberCount++
        })
      }
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
      .addField(`Bots:`, checkMembers(msg.guild, `bot`), false)
      .addField(`Humans:`, checkMembers(msg.guild, `user`), false)
      .addField(`Is this guild considered large? (250+ members):`, msg.guild.large ? `Yes` : `No`, false)
      .addField(`Region:`, msg.guild.region, false)
      .setFooter(`Guild created at:`)
      .setTimestamp(msg.guild.createdAt)

    return msg.say(embed)
  }
}
