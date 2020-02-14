const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendSimpleEmbededMessage, hexColorWith0x } = require(`../../libs/embeds`)

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
          default: ``,
          key: `say`,
          prompt: `What would you like the bot to embed?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { say }) {
    if (say === ``) {
      return sendCMDUsage(msg, this, `message`)
    } else if (msg.channel.type === `dm` || !msg.guild.me.hasPermission(`MANAGE_MESSAGES`)) {
      return sendSimpleEmbededMessage(msg, ``, say, hexColorWith0x())
    } else {
      return msg.delete().then(sendSimpleEmbededMessage(msg, ``, say, hexColorWith0x())).catch()
    }
  }
}
