const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class XYZCommand extends Command {
  constructor (client) {
    super(client, {
      name: `base`,
      aliases: [`base1`],
      group: `main`,
      memberName: `base`,
      description: `A base command to copy`,
      examples: [`base`]
      // args: [{}]
    })
  }
  run (msg) {
    msg.say(`Change me you fool`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
