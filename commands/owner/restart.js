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
      description: `Restarts the systemd service or the nodejs process`,
      ownerOnly: true,
      examples: [`restart`],
      aliases: [`reboot`]
    })
  }
  run (msg) {
    const shell = require(`shelljs`)
    function resNow () {
      shell.exec(`systemctl restart bot`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        log.Info(`Restarting!`)
      })
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (process.platform !== `win32`) {
      return msg.say(`Restarting...`).then(setTimeout(resNow, 1000))
    } else {
      return msg.say(`Not implemented`)
      /* msg.say(`Restarting...`);
      shell.exec(
        `cd scripts && taskkill /f /im node.exe && start run.bat`,
        { shell: `C:\\Windows\\System32\\cmd.exe` },
        function(code, stdout, stderr) {
          msg.say(stdout);
        }
      ); */
    }
  }
}
