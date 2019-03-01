const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class DogCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`dawg`, `dog`, `doge`, `doggie`, `doggo`, `pupper`, `puppy`],
      description: `Sends a random image of a dog`,
      examples: [`dog`],
      group: `animals`,
      memberName: `dog`,
      name: `dog`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://dog.ceo/api/breeds/image/random`, `message`)
  }
}
