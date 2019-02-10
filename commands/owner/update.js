const { Command } = require(`discord.js-commando`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class UpdateCommand extends Command {
  constructor (client) {
    super(client, {
      name: `update`,
      group: `owner`,
      memberName: `update`,
      description: `Updates the bot using \`git pull ...\`.`,
      ownerOnly: true,
      examples: [`update`]
    })
  }
  run (msg) {
    const shell = require(`shelljs`)
    if (process.platform !== `win32`) {
      shell.exec(
        `cd scripts/ && sh update.sh`,
        { shell: `/bin/bash` },
        function onDone (code, stdout) {
          msg.say(stdout)
        }
      )
    } else {
      shell.exec(
        `cd scripts && .\\update.bat`,
        { shell: `C:\\Windows\\System32\\cmd.exe` },
        function onDone (code, stdout) {
          msg.say(stdout)
        }
      )
    }

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
