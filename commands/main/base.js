const { Command } = require(`discord.js-commando`)

module.exports = class XYZCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`base1`],
      description: `A base command to copy`,
      examples: [`base`],
      group: `main`,
      memberName: `base`,
      name: `base`
      // args: [{}]
    })
  }
  run (msg) {
    return msg.say(`Change me you fool`)
  }
}
