const { Command } = require(`discord.js-commando`)

module.exports = class GitHubCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`gh`, `gith`],
      description: `Show the GitHub page of the bot`,
      examples: [`github`],
      group: `main`,
      memberName: `github`,
      name: `github`
    })
  }

  run (msg) {
    return msg.say(`GitHub repository can be found here: https://github.com/JaxTheWolf/SpecBot_DC`)
      .then(msg.say(`Homepage can be found here: https://JaxTheWolf.github.io/SpecBot_DC`))
  }
}
