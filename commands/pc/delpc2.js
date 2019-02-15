const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/delConf`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DelPC2Command extends Command {
  constructor (client) {
    super(client, {
      name: `delpc2`,
      group: `pc`,
      memberName: `delpc2`,
      description: `Deletes your configuration.`,
      examples: [`delpc2 yes`],
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
    delConf(msg, confirm, __dirname, `conf2`)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
