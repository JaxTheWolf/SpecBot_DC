const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class UptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: `uptime`,
      group: `info`,
      memberName: `uptime`,
      description: `Displays how long the bot is on.`,
      examples: [`uptime`]
    });
  }
  run(msg) {
    function convertMS(milliseconds) {
      let day, hour, minute, seconds;
      seconds = Math.floor(milliseconds / 1000);
      minute = Math.floor(seconds / 60);
      seconds = seconds % 60;
      hour = Math.floor(minute / 60);
      minute = minute % 60;
      day = Math.floor(hour / 24);
      hour = hour % 24;

      let retDay;
      let retHour;
      let retMin;
      let retSec;

      if (seconds === 0 || seconds > 1) retSec = seconds + ` seconds`;
      else retSec = seconds + ` second`;
      if (minute === 0 || minute > 1) retMin = minute + ` minutes`;
      else retMin = minute + ` minute`;
      if (hour === 0 || hour > 1) retHour = hour + ` hours`;
      else retHour = hour + ` hour`;
      if (day === 0 || days > 1) retDay = day + ` days`;
      else retDay = day + ` day`;

      return `\`${retDay}\`, \`${retHour}\`, \`${retMin}\` and \`${retSec}\`.`;
    }

    msg.say(`The bot has been on for ${convertMS(this.client.uptime)}`);

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
