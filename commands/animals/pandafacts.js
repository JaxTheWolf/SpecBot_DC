const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../libs/jsonLibs`)

module.exports = class PandaFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`bamboo_muncherfact`, `fatdoggofact`, `pandabearfact`],
      description: `Sends a random panda fact`,
      examples: [`pandafact`],
      group: `animals`,
      memberName: `pandafacts`,
      name: `pandafact`
    })
  }
  run (msg) {
    return fetchText(msg, `🐼`, `https://some-random-api.ml/pandafact`, `fact`)
  }
}
