const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class StatusCommand extends Command {
  constructor(client) {
    super(client, {
      name: `status`,
      group: `owner`,
      memberName: `status`,
      description: `Shows the status of the \`bot\` systemd service (Linux only, also systemd only)`,
      ownerOnly: true,
      examples: [`status`]
    });
  }
  run(msg) {
    let shell = require(`shelljs`);

    if (process.platform !== `win32`) {
      shell.exec(
        `systemctl status bot | tail -10`,
        { shell: `/bin/bash` },
        function onDone(stdout) {
          msg.say(`... ${stdout}`);
        }
      );
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
