const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class GitHubCommand extends Command {
  constructor (client) {
    super(client, {
      name: `github`,
      aliases: [`gh`, `gith`],
      group: `main`,
      memberName: `github`,
      description: `Show the GitHub page of the bot.`,
      examples: [`github`]
    })
  }

  run (msg) {
    msg
      .say(`GitHub repository can be found here: https://github.com/JaxTheWolf/SpecBot_DC`)
      .then(msg.say(`Homepage can be found here: https://JaxTheWolf.github.io/SpecBot_DC`))

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
