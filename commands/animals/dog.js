const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../libs/jsonLibs`)

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
    return sendImg(msg, `https://dog.ceo/api/breeds/image/random`, `message`)
  }
}
