const { Command } = require(`discord.js-commando`)
const { setConf } = require(`../../libs/pcLibs`)

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

    return setConf(msg, content, `server`, __dirname)
  }
}
