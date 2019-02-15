const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class RestartCommand extends Command {
  constructor (client) {
    super(client, {
      name: `restart`,
      group: `owner`,
      memberName: `restart`,
      description: `Restarts the systemd service or the nodejs process.`,
      ownerOnly: true,
      examples: [`restart`]
    })
  }
  run (msg) {
    const shell = require(`shelljs`)
    function resNow () {
      shell.exec(
        `systemctl restart bot`,
        { shell: `/bin/bash` },
        function onDone (code, stdout) {
          msg.say(stdout)
        }
      )
    }

    if (process.platform !== `win32`) {
      msg.say(`Restarting...`)
      setTimeout(resNow, 1000)
    } else {
      msg.say(`Not implemented`)
      /* msg.say(`Restarting...`);
      shell.exec(
        `cd scripts && taskkill /f /im node.exe && start run.bat`,
        { shell: `C:\\Windows\\System32\\cmd.exe` },
        function(code, stdout, stderr) {
          msg.say(stdout);
        }
      ); */
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
