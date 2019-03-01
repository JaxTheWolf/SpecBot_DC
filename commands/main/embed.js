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
      clientPermissions: [`MANAGE_MESSAGES`],
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
    msg.delete().catch()
    const toSay = new RichEmbed()

    function checkAnon (toCheck) {
      if (toCheck.includes(`///anon`)) return true
      else return false
    }

    if (!checkAnon(msg.content)) {
      toSay
        .setAuthor(`${msg.author.username} says:`, msg.author.displayAvatarURL)
        .setColor(randomHexColor())
        .setDescription(say)
    } else {
      toSay
        .setColor(randomHexColor())
        .setDescription(say.replace(`///anon`, ``))
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(toSay)
  }
}
