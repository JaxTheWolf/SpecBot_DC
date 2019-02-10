const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
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
      description: `Shows the bot statistics.`,
      examples: [`stats`]
    })
  }
  run (msg) {
    const duration = moment
      .duration(this.client.uptime)
      .format(` D [days], H [hrs], m [mins], s [secs]`)

    let dir

    const fs = require(`fs`)
    dir = `${__dirname}/../../conf1`
    const pc1 = fs.readdirSync(dir).length - 1
    dir = `${__dirname}/../../conf2`
    const pc2 = fs.readdirSync(dir).length - 1
    dir = `${__dirname}/../../server`
    const servers = fs.readdirSync(dir).length - 1
    const { version } = require(`../../package.json`)

    msg.say(
      `---STATISTICS---
      • Mem Used (bot only) :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
      • Mem Used (total)    :: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
      • Uptime              :: ${duration}
      • Users               :: ${this.client.users.size.toLocaleString()}
      • Servers             :: ${this.client.guilds.size.toLocaleString()}
      • Channels            :: ${this.client.channels.size.toLocaleString()}
      • PC1 Confs           :: ${pc1}
      • PC2 Confs           :: ${pc2}
      • Server Confs        :: ${servers}
      • Bot version         :: v${version}
      • Discord.js          :: v${Discord.version}
      • Node                :: ${process.version}`,
      { code: `asciidoc` }
    )

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
