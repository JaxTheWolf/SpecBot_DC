const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: `restart`,
      aliases: [`restart`],
      group: `owner`,
      memberName: `restart`,
      description: `Restarts the systemd service. Linux only`,
      ownerOnly: true,
      examples: [`restart`]
    });
  }
  run(msg) {
    let shell = require(`shelljs`);

    if (process.platform !== `win32`) {
      shell.exec(`systemctl restart bot`, { shell: `/bin/bash` }, function(
        code,
        stdout,
        stderr
      ) {
        msg.say(stdout);
      });
    } else {
      msg.say(`wip`);
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
