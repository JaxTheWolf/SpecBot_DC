const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const Discord = require(`discord.js`);
const moment = require(`moment`);
require(`moment-duration-format`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class XYZCommand extends Command {
  constructor(client) {
    super(client, {
      name: `stats`,
      group: `info`,
      memberName: `stats`,
      description: `Shows the bot statistics`,
      examples: [`stats`]
    });
  }
  run(msg) {
    const duration = moment
      .duration(this.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    msg.channel.send(
      `---STATISTICS---
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    )} MB
    • Uptime     :: ${duration}
    • Users      :: ${this.client.users.size.toLocaleString()}
    • Servers    :: ${this.client.guilds.size.toLocaleString()}
    • Channels   :: ${this.client.channels.size.toLocaleString()}
    • Discord.js :: v${Discord.version}
    • Node       :: ${process.version}`,
      { code: "asciidoc" }
    );

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
