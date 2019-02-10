const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class CreditsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `credits`,
      aliases: [`creds`, `authors`],
      group: `main`,
      memberName: `credits`,
      description: `Credits creators.`,
      examples: [`credits`]
    })
  }
  run (msg) {
    msg.say(
      `SpecBot is coded by Roman Lubij, oko123#8509 and Designed by Jonne-Patrik Savimäki, The76i#1234, artwork by CrazyPenguin01#7682\nHomepage: https://jaxthewolf.github.io/SpecBot_DC/`
    )

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
