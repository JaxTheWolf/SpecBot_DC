const { Command } = require(`discord.js-commando`)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`repeat`, `msg`],
      description: `Repeats whatever you specify`,
      examples: [`say oko sux`],
      group: `main`,
      memberName: `say`,
      name: `say`,
      args: [
        {
          key: `say`,
          prompt: `What would you like the bot to repeat?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { say }) {
    if (msg.channel.type === `dm` || !msg.guild.me.hasPermission(`MANAGE_MESSAGES`)) {
      return msg.say(say)
    } else {
      return msg.delete().then(msg.say(say)).catch()
    }
  }
}
