const { Command } = require(`discord.js-commando`)

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
    return msg.say(`All donations are appreciated! We thank you for your donation! https://ko-fi.com/specbot`)
      .then(msg.say(`If you don't have or don't want to spend real money, you can always help us by spreading the bot by using -invite command, and share it through our GitHub page! <https://github.com/JaxTheWolf/SpecBot_DC>`))
  }
}
