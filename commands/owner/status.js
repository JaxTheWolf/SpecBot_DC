const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class StatusCommand extends Command {
  constructor (client) {
    super(client, {
      name: `status`,
      group: `owner`,
      memberName: `status`,
      description: `Shows the status of the \`bot\` systemd service (Linux only, also systemd only)`,
      ownerOnly: true,
      examples: [`status`]
    })
  }
  run (msg) {
    const shell = require(`shelljs`)

    if (process.platform !== `win32`) {
      shell.exec(
        `systemctl status bot | tail -10`,
        { shell: `/bin/bash` },
        function onDone (code, stdout) {
          msg.say(`... ${stdout}`)
        })
    } else {
      msg.say(`wip`)
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
