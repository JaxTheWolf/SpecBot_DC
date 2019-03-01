const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendConf } = require(`../../libs/pcLibs`)
log.SetUserOptions(options)

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Replies with a user's server`,
      examples: [`server @oko123#8509`],
      group: `pc`,
      memberName: `server`,
      name: `server`,
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Which user's server would you like to view?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendConf(msg, user, `server`, __dirname)
  }
}
