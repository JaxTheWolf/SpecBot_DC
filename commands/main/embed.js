const log = require(`node-file-logger`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Embeds whatever you specify`,
      examples: [`embed lul`],
      group: `main`,
      memberName: `embed`,
      name: `embed`,
      args: [
        {
          key: `say`,
          prompt: `What would you like the bot to embed?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { say }) {
    const toSay = new RichEmbed()
      .setColor(randomHexColor())

    function checkAnon (toCheck) {
      if (toCheck.includes(`///anon`)) return true
      else return false
    }

    function sendEmbed (msg) {
      if (!checkAnon(msg.content)) {
        toSay
          .setAuthor(`${msg.author.username} says:`, msg.author.displayAvatarURL)
          .setDescription(say)
      } else {
        toSay
          .setDescription(say.replace(`///anon`, ``))
      }
      return msg.say(toSay)
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (msg.channel.type === `dm` || !msg.guild.me.hasPermission(`MANAGE_MESSAGES`)) {
      return sendEmbed(msg)
    } else {
      return msg.delete().then(sendEmbed(msg)).catch()
    }
  }
}
