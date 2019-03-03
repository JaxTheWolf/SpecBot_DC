const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { exec } = require(`shelljs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class UpdateCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Updates the bot using \`git pull ...\``,
      examples: [`update`],
      group: `owner`,
      memberName: `update`,
      name: `update`,
      ownerOnly: true
    })
  }
  run (msg) {
    if (process.platform !== `win32`) {
      exec(`cd scripts/ && sh update.sh | tail -10`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
