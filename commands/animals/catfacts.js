const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)

module.exports = class catFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `catfacts`,
        `kittenfact`,
        `kittyfact`,
        `pussfact`,
        `pussycatfact`,
        `pussyfact`
      ],
      description: `Sends a random dog fact`,
      examples: [`catfact`],
      group: `animals`,
      memberName: `catfacts`,
      name: `catfact`
    })
  }
  run (msg) {
    return fetchText(msg, `🐱`, `https://some-random-api.ml/catfact`, `fact`)
  }
}
