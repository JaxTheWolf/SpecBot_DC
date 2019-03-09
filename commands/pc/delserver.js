const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your server`,
      examples: [`delserver yes`],
      group: `pc`,
      memberName: `delserver`,
      name: `delserver`,
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
    return delConf(msg, confirm, __dirname, `server`)
  }
}
