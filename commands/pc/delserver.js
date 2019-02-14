const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/delConf`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      name: `delserver`,
      group: `pc`,
      memberName: `delserver`,
      description: `Deletes your server.`,
      examples: [`delserver true`],
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
    delConf(msg, confirm, __dirname, `server`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
