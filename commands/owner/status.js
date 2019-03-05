const { Command } = require(`discord.js-commando`)
const { exec } = require(`shelljs`)

module.exports = class StatusCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Shows the status of the \`bot\` systemd service (Linux only, also systemd only)`,
      examples: [`status`],
      group: `owner`,
      memberName: `status`,
      name: `status`,
      ownerOnly: true
    })
  }
  run (msg) {
    if (process.platform !== `win32`) {
      exec(`cd scripts/ && sh service.sh status`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    }
  }
}
