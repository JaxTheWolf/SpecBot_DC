const { Command } = require(`discord.js-commando`)
const { editConf } = require(`../../libs/pcLibs`)

module.exports = class EditPC2Comand extends Command {
  constructor (client) {
    super(client, {
      examples: [
        `editpc1 GPU "Radeon R4" (Wrap arguments with spaces in quotes)`
      ],
      aliases: [`edit2`],
      description: `Edits your second configuration`,
      group: `pc`,
      memberName: `editpc2`,
      name: `editpc2`,
      args: [
        {
          key: `component`,
          prompt: `Which component would you like to edit?`,
          type: `string`
        },
        {
          key: `newCmp`,
          prompt: `What should the new entry be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { component, newCmp }) {
    return editConf(msg, component, newCmp, __dirname, `conf2`)
  }
}
