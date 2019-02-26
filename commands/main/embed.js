const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      name: `embed`,
      group: `main`,
      memberName: `embed`,
      description: `Embeds whatever you specify`,
      examples: [`embed lul`],
      clientPermissions: [`MANAGE_MESSAGES`],
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
    msg.delete()
    const toSay = new RichEmbed()

    function checkAnon (toCheck) {
      if (toCheck.includes(`///anon`)) return true
      else return false
    }

    if (!checkAnon(msg.content)) {
      toSay
        .setAuthor(`${msg.author.username} says:`, msg.author.displayAvatarURL)
        .setDescription(say)
        .setColor(randomHexColor())
    } else {
      toSay
        .setDescription(say.replace(`///anon`, ``))
        .setColor(randomHexColor())
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(toSay)
  }
}
