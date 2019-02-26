const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class UpdateCommand extends Command {
  constructor (client) {
    super(client, {
      name: `update`,
      group: `owner`,
      memberName: `update`,
      description: `Updates the bot using \`git pull ...\``,
      ownerOnly: true,
      examples: [`update`]
    })
  }
  run (msg) {
    const shell = require(`shelljs`)
    if (process.platform !== `win32`) {
      shell.exec(`cd scripts/ && sh update.sh | tail -10`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    } else {
      shell.exec(`cd scripts && .\\update.bat`, { shell: `C:\\Windows\\System32\\cmd.exe` }, function onDone (code, stdout) {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
