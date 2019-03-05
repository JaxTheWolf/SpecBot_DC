const { Command } = require(`discord.js-commando`)
const { sendConf } = require(`../../libs/pcLibs`)

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
    return sendConf(msg, user, `server`, __dirname)
  }
}
