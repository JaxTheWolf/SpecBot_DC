const SQLite = require(`better-sqlite3`)
const moment = require(`moment`)
const verCommando = require(`discord.js-commando`).version
const verDC = require(`discord.js`).version
const { Command } = require(`discord.js-commando`)
const { version } = require(`../../package.json`)
require(`moment-duration-format`)

module.exports = class StatsCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Shows the bot statistics`,
      examples: [`stats`],
      group: `info`,
      memberName: `stats`,
      name: `stats`
    })
  }
  run (msg) {
    const countConfigs = (conf) => {
      return new SQLite(`${__dirname}/../../DBs/configurations.sqlite3`)
        .prepare(`SELECT COUNT(id) FROM ${conf}`)
        .get()[`COUNT(id)`]
    }

    return msg.say(
      `---STATISTICS---
      • Mem Used (bot only)  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
      • Mem Used (total)     :: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
      • Uptime               :: ${moment.duration(this.client.uptime).format(` D [days], H [hrs], m [mins], s [secs]`)}
      • Users                :: ${this.client.users.size.toLocaleString()}
      • Servers              :: ${this.client.guilds.size.toLocaleString()}
      • Channels             :: ${this.client.channels.size.toLocaleString()}
      • PC1 confs            :: ${countConfigs(`conf1`)}
      • PC2 confs            :: ${countConfigs(`conf2`)}
      • Server confs         :: ${countConfigs(`server`)}
      • Bot version          :: v${version}
      • Discord.js           :: v${verDC}
      • Discord.js-Commando  :: v${verCommando}
      • Node                 :: ${process.version}`,
      { code: `asciidoc` }
    )
  }
}
