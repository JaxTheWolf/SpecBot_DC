const { Command } = require(`discord.js-commando`)

module.exports = class CreditsCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`creds`, `authors`],
      description: `Credits creators`,
      examples: [`credits`],
      group: `main`,
      memberName: `credits`,
      name: `credits`
    })
  }
  run (msg) {
    return msg.say(`SpecBot is coded by Roman Lubij, oko123#8509 and Designed by Jonne-Patrik Savimäki, Meme Inspector#0001, artwork by CrazyPenguin01#7682`)
      .then(msg.say(`Homepage: https://jaxthewolf.github.io/SpecBot_DC/`))
  }
}
