const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

module.exports = class DelConfCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your configuration (1, 2 or server)`,
      examples: [`delconf 1 yes`, `delconf server no`],
      group: `pc`,
      memberName: `delconf`,
      name: `delconf`,
      args: [
        {
          default: ``,
          error: `Please respond with the number of the configuration you'd like to delete (1 or 2)`,
          key: `confNum`,
          oneOf: [`1`, `2`, `server`],
          prompt: `Which configuration would you like to delete? (1, 2 or server)`,
          type: `string`
        },
        {
          default: ``,
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { confNum, confirm }) {
    if (confNum === `` || confirm === ``) {
      return sendCMDUsage(msg, this, [`configuration (1, 2 or server)`, `confirm (yes or no)`])
    } else {
      return delConf(msg, confirm, __dirname, confNum)
    }
  }
}
