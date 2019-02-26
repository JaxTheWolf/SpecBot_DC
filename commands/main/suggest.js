const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class SuggestCommand extends Command {
  constructor (client) {
    super(client, {
      name: `suggest`,
      aliases: [`sugg`, `request`, `featurereq`, `suggestion`],
      group: `main`,
      memberName: `suggest`,
      description: `Suggest a feature for SpecBot`,
      examples: [`suggest pc edits`]
    })
  }
  run (msg) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`Suggest new features here! https://goo.gl/forms/4LEfWSqBWHgi3umX2`)
  }
}
