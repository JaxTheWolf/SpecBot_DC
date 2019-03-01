const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`Suggest new features here! https://goo.gl/forms/4LEfWSqBWHgi3umX2`)
  }
}
