const { Command } = require(`discord.js-commando`)
const { exec } = require(`shelljs`)

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
      exec(`cd scripts/ && sh update.sh | tail -10`, { shell: `/bin/bash` }, (code, stdout) => {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    }
  }
}
