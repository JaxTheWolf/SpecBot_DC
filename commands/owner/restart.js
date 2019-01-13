const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: `restart`,
      group: `owner`,
      memberName: `restart`,
      description: `Restarts the systemd service or the nodejs process.`,
      ownerOnly: true,
      examples: [`restart`]
    });
  }
  run(msg) {
    let shell = require(`shelljs`);

    if (process.platform !== `win32`) {
      function resNow() {
        shell.exec(`systemctl restart bot`, { shell: `/bin/bash` }, function(
          code,
          stdout,
          stderr
        ) {
          msg.say(stdout);
        });
      }
      msg.say(`Restarting...`);
      setTimeout(resNow, 1000);
    } else {
      msg.say(`Not implemented`);
      /*msg.say(`Restarting...`);
      shell.exec(
        `cd scripts && taskkill /f /im node.exe && start run.bat`,
        { shell: `C:\\Windows\\System32\\cmd.exe` },
        function(code, stdout, stderr) {
          msg.say(stdout);
        }
      );*/
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
