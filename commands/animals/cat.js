const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
const https = require(`https`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class CatCommand extends Command {
  constructor (client) {
    super(client, {
      name: `cat`,
      aliases: [`kitty`, `puss`, `pussy`, `cat`, `kitten`, `pussycat`],
      group: `animals`,
      memberName: `cat`,
      description: `Sends a random image of a cat.`,
      examples: [`cat`]
    })
  }
  run (msg) {
    const requestURL = `https://some-random-api.ml/catimg`
    https
      .get(requestURL, function onDone (response) {
        let data = ``
        response.on(`data`, chunk => {
          data += chunk
        })
        response.on(`end`, () => {
          const embed = new RichEmbed()
            .setImage(JSON.parse(data).link)
            .setFooter(`Images are fetched from https://some-random-api.ml`)
            .setColor(randomHexColor())
          msg.say(embed)
        })
      })
      .on(`error`, err => {
        msg.say(`An error has occured. (${err.message})`)
      })

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
