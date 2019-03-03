const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { exec } = require(`shelljs`)
const { options } = require(`../../configs/options`)
const { sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class RestartCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`reboot`],
      description: `Restarts the systemd service or the nodejs process`,
      examples: [`restart`],
      group: `owner`,
      memberName: `restart`,
      name: `restart`,
      ownerOnly: true
    })
  }
  run (msg) {
    function resNow () {
      exec(`cd scripts/ && sh service.sh restart`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        log.Info(`Restarting!`)
      })
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    if (process.platform !== `win32`) {
      return sendSuccessEmbed(msg, `Restarting...`, ``).then(setTimeout(resNow, 1000))
    }
  }
}
