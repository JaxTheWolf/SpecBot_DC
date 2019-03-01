const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class DonateCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`contribute`, `support`],
      description: `Donate to developers of SpecBot`,
      examples: [`donate`],
      group: `main`,
      memberName: `donate`,
      name: `donate`
    })
  }

  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`All donations are appreciated! We thank you for your donation! https://ko-fi.com/specbot`)
      .then(msg.say(`If you don't have or don't want to spend real money, you can always help us by spreading the bot by using -invite command, and share it through our GitHub page! <https://github.com/JaxTheWolf/SpecBot_DC>`))
  }
}
