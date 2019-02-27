const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class MuteAnnCommand extends Command {
  constructor (client) {
    super(client, {
      name: `muteann`,
      aliases: [`muteann`],
      group: `settings`,
      memberName: `muteann`,
      description: `If you wish ot stop recieving SpecBot announcements in your server run this command. TO enable them; run it again`,
      examples: [`muteann`]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg) {
    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    switch (this.client.provider.get(msg.guild, `muteann`, null)) {
    case null:
      this.client.provider.set(msg.guild, `muteann`, false)
        .then(s => msg.reply(`This guild hasn't set this option yet. Setting it to \`${s}\`.`))
      break
    case false:
      this.client.provider.set(msg.guild, `muteann`, true)
        .then(msg.reply(`You will no longer recieve SpecBot announcements unless you enable them again with \`-muteann.\``))
      break
    case true:
      this.client.provider.set(msg.guild, `muteann`, false)
        .then(msg.reply(`You will recieve SpecBot annoucements from now on. To disable them run \`-muteann\`.`))
      break
    }
  }
}
