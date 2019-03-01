const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { setConf } = require(`../../libs/pcLibs`)
log.SetUserOptions(options)

module.exports = class SetServerCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sets a server`,
      examples: [`setserver`],
      group: `pc`,
      memberName: `setserver`,
      name: `setserver`,
      args: [
        {
          infinite: true,
          key: `serverconf`,
          prompt: `Type out your server specs here:`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { serverconf }) {
    const content = `Server: \n${serverconf
      .toString()
      .split(`,`)
      .join(`\n`)}`

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return setConf(msg, content, `server`, __dirname)
  }
}
