const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DelPC1Command extends Command {
  constructor (client) {
    super(client, {
      name: `delpc1`,
      group: `pc`,
      memberName: `delpc1`,
      description: `Deletes your configuration`,
      examples: [`delpc1 yes`],
      args: [
        {
          key: `confirm`,
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`,
          oneOf: [`yes`, `no`],
          error: `Reply with yes/no.`
        }
      ]
    })
  }
  run (msg, { confirm }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return delConf(msg, confirm, __dirname, `conf1`)
  }
}
