const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { editConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return editConf(msg, component, newCmp, __dirname, `conf2`)
  }
}
