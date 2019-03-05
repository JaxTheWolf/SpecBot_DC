const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)

module.exports = class DogFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `dawgfact`,
        `dogefact`,
        `dogfact`,
        `doggiefact`,
        `doggofact`,
        `pupperfact`,
        `puppyfact`
      ],
      description: `Sends a random dog fact`,
      examples: [`dogfact`],
      group: `animals`,
      memberName: `dogfacts`,
      name: `dogfact`
    })
  }
  run (msg) {
    return fetchText(msg, `🐶`, `https://some-random-api.ml/dogfact`, `fact`)
  }
}
