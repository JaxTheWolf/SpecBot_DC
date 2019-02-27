const { Command } = require(`discord.js-commando`)
const { sendConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PC2Command extends Command {
  constructor (client) {
    super(client, {
      name: `pc2`,
      group: `pc`,
      memberName: `pc2`,
      description: `Replies with a user's second configuration`,
      examples: [`pc2 @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's second configuration would you like to view?`,
          type: `user`,
          default: ``,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  run (msg, { user }) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendConf(msg, user, `conf2`, __dirname)
  }
}
