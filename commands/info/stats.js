const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { version } = require(`../../package.json`)
const SQLite = require(`better-sqlite3`)
const Discord = require(`discord.js`)
const moment = require(`moment`)
require(`moment-duration-format`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class StatsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `stats`,
      group: `info`,
      memberName: `stats`,
      description: `Shows the bot statistics`,
      examples: [`stats`]
    })
  }
  run (msg) {
    const duration = moment
      .duration(this.client.uptime)
      .format(` D [days], H [hrs], m [mins], s [secs]`)

    function countConfigs (conf) {
      return new SQLite(`${__dirname}/../../DBs/configurations.sqlite3`)
        .prepare(`SELECT COUNT(id) FROM ${conf}`)
        .get()[`COUNT(id)`]
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return msg.say(
      `---STATISTICS---
      • Mem Used (bot only) :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
      • Mem Used (total)    :: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
      • Uptime              :: ${duration}
      • Users               :: ${this.client.users.size.toLocaleString()}
      • Servers             :: ${this.client.guilds.size.toLocaleString()}
      • Channels            :: ${this.client.channels.size.toLocaleString()}
      • PC1 confs           :: ${countConfigs(`conf1`)}
      • PC2 confs           :: ${countConfigs(`conf2`)}
      • Server confs        :: ${countConfigs(`server`)}
      • Bot version         :: v${version}
      • Discord.js          :: v${Discord.version}
      • Node                :: ${process.version}`,
      { code: `asciidoc` }
    )
  }
}
