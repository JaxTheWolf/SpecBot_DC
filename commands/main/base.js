const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`Change me you fool`)
  }
}
