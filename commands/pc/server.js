const { Command } = require(`discord.js-commando`)
const { sendConf } = require(`../../libs/sendConf`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      name: `server`,
      group: `pc`,
      memberName: `server`,
      description: `Replies with a user's server`,
      examples: [`server @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's server would you like to view?`,
          type: `user`,
          default: ``,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  run (msg, { user }) {
    sendConf(msg, user, `server`, __dirname)

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
