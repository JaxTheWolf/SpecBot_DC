const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { delConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class DelPC2Command extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your second configuration`,
      examples: [`delpc2 yes`],
      group: `pc`,
      memberName: `delpc2`,
      name: `delpc2`,
      args: [
        {
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { confirm }) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return delConf(msg, confirm, __dirname, `conf2`)
  }
}
