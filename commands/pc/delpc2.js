const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)

module.exports = class DelPC2Command extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your second configuration`,
      examples: [`delpc2 yes`],
      group: `pc`,
      memberName: `delpc2`,
      name: `delpc2`,
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
    return delConf(msg, confirm, __dirname, `conf2`)
  }
}
