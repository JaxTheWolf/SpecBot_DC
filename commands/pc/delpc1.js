const { Command } = require(`discord.js-commando`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class DelPC1Command extends Command {
  constructor (client) {
    super(client, {
      name: `delpc1`,
      group: `pc`,
      memberName: `delpc1`,
      description: `Deletes your configuration.`,
      examples: [`delpc1 yes`],
      args: [
        {
          key: `confirm`,
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`,
          oneOf: [`yes`, `no`],
          error: `Reply with yes/no.`
        }
      ]
    })
  }
  run (msg, { confirm }) {
    if (confirm === `no`) {
      return msg.reply(`Cancelled command.`)
    } else {
      const fs = require(`fs`)
      const owner = msg.author
      const delFrom = `${__dirname}/../../conf1`

      fs.unlink(`${delFrom}/${owner.id}.txt`, function onError (err) {
        if (err) {
          console.log(err)
          msg.reply(
            `You don't have a configuration yet or an error has occured. (\`${
              err
            }\`)`
          )
        } else {
          msg.reply(`Your configuration has been successcully deleted!`)
        }
      })
    }

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
