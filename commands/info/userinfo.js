const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)

module.exports = class UserInfoCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`uinfo`, `user_info`, `u_info`],
      description: `Sends info about you or the tagged user (if any)`,
      examples: [`userinfo @user0000`],
      group: `info`,
      guildOnly: true,
      memberName: `userinfo`,
      name: `userinfo`,
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Whose info would you want to see?`,
          type: `member`
        }
      ]
    })
  }
  run (msg, { member }) {
    const statuses = {
      dnd: `Do Not Disturb`,
      idle: `Idle`,
      offline: `Offline/Invisible`,
      online: `Online`
    }
    let uMember, uAvatar

    if (member === ``) {
      uMember = msg.guild.member(msg.author)
      uAvatar = msg.author.displayAvatarURL
    } else {
      uMember = member
      uAvatar = member.user.displayAvatarURL
    }

    const embed = new RichEmbed()
      .addField(`Created`, `${uMember.user.createdAt.toLocaleString()}`, true)
      .addField(`Joined`, `${uMember.joinedAt.toLocaleString()}`, true)
      .addField(`Nickname`, uMember.nickname === null ? `None` : uMember.nickname, true)
      .addField(`Roles [${uMember.roles.size - 1}]`, `${uMember.roles.size <= 1 ? `none` : uMember.roles.map(r => r).slice(1).join(` `)}`, true)
      .addField(`Status`, ` ${statuses[uMember.presence.status]}`, true)
      .setAuthor(uMember.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())
      .setDescription(uMember)
      .setFooter(`ID: ${uMember.id}`)
      .setThumbnail(uAvatar)
      .setTimestamp(new Date())
    return msg.say({ embed })
  }
}
