const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/imageFetcher`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DogCommand extends Command {
  constructor (client) {
    super(client, {
      name: `dog`,
      aliases: [`dog`, `doggie`, `puppy`, `pupper`, `dawg`, `doggo`, `doge`],
      group: `animals`,
      memberName: `dog`,
      description: `Sends a random image of a dog.`,
      examples: [`dog`]
    })
  }
  run (msg) {
    sendImg(msg, `https://dog.ceo/api/breeds/image/random`, `Images are fetched from https://dog.ceo`, `message`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
