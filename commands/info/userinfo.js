const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class UserInfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: `userinfo`,
      aliases: [`uinfo`, `user_info`, `u_info`],
      group: `info`,
      memberName: `userinfo`,
      description: `Sends info about you or the tagged user (if any)`,
      guildOnly: true,
      examples: [`userinfo @user0000`],
      args: [
        {
          key: `member`,
          prompt: `Whose info would you want to see?`,
          default: ``,
          type: `member`,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  run (msg, { member }) {
    function isBot (user) {
      return isBot === false ? `**No**` : `**Yes**`
    }

    function getNick (user) {
      return user.nickname === null ? `**None**` : `**${user.nickname}**`
    }

    function getPlayStat (user) {
      return user.presence.game.name === null
        ? `**nothing**`
        : `**${user.presence.game.name}**`
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
      .setFooter(`User created at`)
      .setColor(randomHexColor())
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
    if (member === ``) {
      embed
        .setTitle(`Here's some info about you:`)
        .setThumbnail(msg.author.displayAvatarURL)
        .addField(`Your **username** is:`, `**${msg.author.username}**`, false)
        .addField(`Your **nickname** is:`, getNick(msg.guild.member(msg.author)), false)
        .addField(`Your **ID** is:`, `**${msg.author.id}**`, false)
        .addField(`You have **joined** this guild at:`, `**${msg.guild.member(msg.author).joinedAt}**`, false)
        .addField(`You are currently ${getStatus(msg.guild.member(msg.author))}`, `and playing ${getPlayStat(msg.guild.member(msg.author))}`, false)
        .setTimestamp(msg.author.createdAt)
    } else {
      embed
        .setTitle(`Here's some info about **${member.user.tag}**:`)
        .setThumbnail(member.user.displayAvatarURL)
        .addField(`Their **username** is:`, `**${member.user.username}**`, false)
        .addField(`Their **nickname** is:`, getNick(member), false)
        .addField(`Their **ID** is:`, `**${member.user.id}**`, false)
        .addField(`They have **joined** this guild at:`, `**${member.joinedAt}**`, false)
        .addField(`They are currently ${getStatus(member)}`, `and playing ${getPlayStat(member)}`, false)
        .addField(`Are they a **bot user**?`, isBot(member.user), false)
        .setTimestamp(member.user.createdAt)
    }
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(embed)
  }
}
