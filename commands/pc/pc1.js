const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendConf } = require(`../../libs/pcLibs`)
log.SetUserOptions(options)

module.exports = class PC1Command extends Command {
  constructor (client) {
    super(client, {
      description: `Replies with a user's configuration`,
      examples: [`pc1 @oko123#8509`],
      group: `pc`,
      memberName: `pc1`,
      name: `pc1`,
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Which user's configuration would you like to view?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { user }) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendConf(msg, user, `conf1`, __dirname)
  }
}
