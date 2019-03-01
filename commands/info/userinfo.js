const log = require(`node-file-logger`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    function isBot (user) {
      return user.bot === false ? `**No**` : `**Yes**`
    }

    function getNick (user) {
      return user.nickname === null ? `**None**` : `**${user.nickname}**`
    }

    function getPlayStat (user) {
      try {
        return `**${user.presence.game.name}**`
      } catch (e) {
        return `**nothing**`
      }
    }

    function getStatus (user) {
      let status
      switch (user.presence.status) {
      case `online`:
        status = `**Online**`
        break
      case `idle`:
        status = `**Idle**`
        break
      case `dnd`:
        status = `**Do Not Disturb**`
        break
      case `offline`:
        status = `**Offline/Invisible**`
        break
      }
      return status
    }
    const embed = new RichEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())
      .setFooter(`User created at`)
    if (member === ``) {
      embed
        .addField(`Your **username** is:`, `**${msg.author.username}**`, false)
        .addField(`Your **nickname** is:`, getNick(msg.guild.member(msg.author)), false)
        .addField(`Your **ID** is:`, `**${msg.author.id}**`, false)
        .addField(`You have **joined** this guild at:`, `**${msg.guild.member(msg.author).joinedAt}**`, false)
        .addField(`You are currently ${getStatus(msg.guild.member(msg.author))}`, `and playing ${getPlayStat(msg.guild.member(msg.author))}`, false)
        .setThumbnail(msg.author.displayAvatarURL)
        .setTimestamp(msg.author.createdAt)
        .setTitle(`Here's some info about you:`)
    } else {
      embed
        .addField(`Their **username** is:`, `**${member.user.username}**`, false)
        .addField(`Their **nickname** is:`, getNick(member), false)
        .addField(`Their **ID** is:`, `**${member.user.id}**`, false)
        .addField(`They have **joined** this guild at:`, `**${member.joinedAt}**`, false)
        .addField(`They are currently ${getStatus(member)}`, `and playing ${getPlayStat(member)}`, false)
        .addField(`Are they a **bot user**?`, isBot(member.user), false)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp(member.user.createdAt)
        .setTitle(`Here's some info about **${member.user.tag}**:`)
    }
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(embed)
  }
}
