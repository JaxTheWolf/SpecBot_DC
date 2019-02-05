const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const Discord = require(`discord.js`);
const moment = require(`moment`);
require(`moment-duration-format`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: `stats`,
      group: `info`,
      memberName: `stats`,
      description: `Shows the bot statistics.`,
      examples: [`stats`]
    });
  }
  run(msg) {
    const duration = moment
      .duration(this.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let dir, pc1, pc2, servers;

    const fs = require(`fs`);
    dir = `${__dirname}/../../conf1`;
    pc1 = fs.readdirSync(dir).length;
    dir = `${__dirname}/../../conf2`;
    pc2 = fs.readdirSync(dir).length;
    dir = `${__dirname}/../../server`;
    servers = fs.readdirSync(dir).length;
    let { version } = require(`../../package.json`);

    msg.say(
      `---STATISTICS---
      • Mem Used (bot only) :: ${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2)} MB
      • Mem Used (total)    :: ${(
        process.memoryUsage().rss /
        1024 /
        1024
      ).toFixed(2)} MB
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
      { code: "asciidoc" }
    );

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
