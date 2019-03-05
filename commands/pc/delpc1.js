const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)

module.exports = class DelPC1Command extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your configuration`,
      examples: [`delpc1 yes`],
      group: `pc`,
      memberName: `delpc1`,
      name: `delpc1`,
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
    return delConf(msg, confirm, __dirname, `conf1`)
  }
}
