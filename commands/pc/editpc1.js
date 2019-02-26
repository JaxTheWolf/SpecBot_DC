const { Command } = require(`discord.js-commando`)
const { editConf } = require(`../../libs/editConf`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class EditPC1Comand extends Command {
  constructor (client) {
    super(client, {
      name: `editpc1`,
      aliases: [`edit1`],
      group: `pc`,
      memberName: `editpc1`,
      description: `Edits your configuration`,
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

    return editConf(msg, component, newCmp, __dirname, `conf1`)
  }
}
