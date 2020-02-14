const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { sendConf } = require(`../../libs/pcLibs`)

module.exports = class ConfCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Replies with a user's configuration`,
      examples: [`conf 1 @oko123#8509`, `conf server @user#0000`],
      group: `pc`,
      memberName: `conf`,
      name: `conf`,
      args: [
        {
          default: ``,
          error: `Please enter which configuration you would like to view (1, 2 or server)`,
          key: `conf`,
          oneOf: [`1`, `2`, `server`],
          prompt: `Which configuration would you like to view? (1, 2 or server)`,
          type: `string`
        },
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
  run (msg, { conf, user }) {
    if (conf === ``) {
      return sendCMDUsage(msg, this, [`configuration (1, 2 or server)`, `(user)`])
    } else {
      return sendConf(msg, user, conf, __dirname)
    }
  }
}
