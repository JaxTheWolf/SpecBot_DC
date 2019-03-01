const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

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
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(`SpecBot is coded by Roman Lubij, oko123#8509 and Designed by Jonne-Patrik Savimäki, The76i#1234, artwork by CrazyPenguin01#7682`)
      .then(msg.say(`Homepage: https://jaxthewolf.github.io/SpecBot_DC/`))
  }
}
