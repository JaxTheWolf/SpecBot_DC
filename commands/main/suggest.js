const { Command } = require(`discord.js-commando`)

module.exports = class SuggestCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`sugg`, `request`, `featurereq`, `suggestion`],
      description: `Suggest a feature for SpecBot`,
      examples: [`suggest`],
      group: `main`,
      memberName: `suggest`,
      name: `suggest`
    })
  }
  run (msg) {
    return msg.say(`Suggest new features here! https://goo.gl/forms/4LEfWSqBWHgi3umX2`)
  }
}
