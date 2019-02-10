const { Command } = require(`discord.js-commando`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DonateCommand extends Command {
  constructor (client) {
    super(client, {
      name: `donate`,
      aliases: [`contribute`, `support`],
      group: `main`,
      memberName: `donate`,
      description: `Donate to developers of SpecBot.`,
      examples: [`donate`]
    })
  }

  run (msg) {
    msg
      .say(
        `All donations are appreciated! We thank you for your donation! https://ko-fi.com/specbot`
      )
      .then(
        msg.say(
          `If you don't have or don't want to spend real money, you can always help us by spreading the bot by using -invite command, and share it through our GitHub page! <https://github.com/JaxTheWolf/SpecBot_DC>`
        )
      )
    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
