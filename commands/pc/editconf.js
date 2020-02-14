const { Command } = require(`discord.js-commando`)
const { editConf } = require(`../../libs/pcLibs`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

module.exports = class EditConfCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`edit`],
      description: `Edits your configuration`,
      examples: [`editpc 1 GPU "Radeon R4" (Wrap arguments with spaces in quotes)`],
      group: `pc`,
      memberName: `editconf`,
      name: `editconf`,
      args: [
        {
          default: ``,
          error: `Please enter the configuration number you'd like to edit (1 or 2)`,
          key: `confNum`,
          oneOf: [`1`, `2`],
          prompt: `Which configuration would you like to edit? (1 or 2)`,
          type: `string`
        },
        {
          default: ``,
          key: `component`,
          prompt: `Which component would you like to edit?`,
          type: `string`
        },
        {
          default: ``,
          key: `newCmp`,
          prompt: `What should the new entry be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { confNum, component, newCmp }) {
    if (confNum === `` || component === `` || newCmp === ``) {
      return sendCMDUsage(msg, this, [`configuration (1 or 2)`, `component`, `newValue`])
    } else {
      return editConf(msg, component, newCmp, __dirname, confNum)
    }
  }
}
