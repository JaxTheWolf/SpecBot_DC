const { Command } = require(`discord.js-commando`)
const { editConf } = require(`../../libs/editConf`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class EditPC2Comand extends Command {
  constructor (client) {
    super(client, {
      name: `editpc2`,
      aliases: [`edit2`],
      group: `pc`,
      memberName: `editpc2`,
      description: `Edits your second configuration`,
      examples: [
        `editpc1 GPU "Radeon R4" (Wrap arguments with spaces in quotes)`
      ],
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
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return editConf(msg, component, newCmp, __dirname, `conf2`)
  }
}
