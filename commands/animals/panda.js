const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
const https = require(`https`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class PandaCommand extends Command {
  constructor (client) {
    super(client, {
      name: `panda`,
      aliases: [`pandabear`, `bamboo_muncher`],
      group: `animals`,
      memberName: `panda`,
      description: `Sends a random image of a panda.`,
      examples: [`panda`]
    })
  }
  run (msg) {
    const requestURL = `https://some-random-api.ml/pandaimg`
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
