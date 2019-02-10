const { Command } = require(`discord.js-commando`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
const https = require(`https`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DogFactCommand extends Command {
  constructor (client) {
    super(client, {
      name: `dogfact`,
      aliases: [`dogfact`, `doggiefact`, `puppyfact`, `pupperfact`, `dawgfact`, `doggofact`, `dogefact`],
      group: `animals`,
      memberName: `dogfacts`,
      description: `Sends some random dog fact.`,
      examples: [`dogfact`]
    })
  }
  run (msg) {
    const requestURL = `https://some-random-api.ml/dogfact`
    https
      .get(requestURL, function onDone (response) {
        let data = ``
        response.on(`data`, chunk => {
          data += chunk
        })
        response.on(`end`, () => {
          msg.say(`🐶 | ${JSON.parse(data).fact}`)
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
