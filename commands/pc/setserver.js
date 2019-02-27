const { Command } = require(`discord.js-commando`)
const { setConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class SetServerCommand extends Command {
  constructor (client) {
    super(client, {
      name: `setserver`,
      group: `pc`,
      memberName: `setserver`,
      description: `Sets a server`,
      examples: [`setserver`],
      args: [
        {
          key: `serverconf`,
          prompt: `Type out your server specs here:`,
          type: `string`,
          infinite: true
        }
      ]
    })
  }
  run (msg, { serverconf }) {
    const content = `Server: \n${serverconf
      .toString()
      .split(`,`)
      .join(`\n`)}`

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return setConf(msg, content, `server`, __dirname)
  }
}
