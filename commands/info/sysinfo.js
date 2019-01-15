// TODO: MAKE THIS WORK PLEB!

const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
const si = require(`systeminformation`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class SystemInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: `sysinfo`,
      group: `info`,
      memberName: `sysinfo`,
      description: `Displays the sysstem status of the bot's host machine.`,
      examples: [`sysinfo`]
    });
  }
  run(msg) {
    function getOS() {
      if (process.platform !== `win32`)
        return `http://icons.iconarchive.com/icons/tatice/operating-systems/256/Linux-icon.png`;
      else
        return `https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/microsoft-512.png`;
    }

    let ret;
    si.cpuCurrentspeed(function(data) {
      let embed = new RichEmbed()
        .setThumbnail(getOS())
        .setColor(randomHexColor())
        .setTitle(`Here's the system info:`)
        .addField(`CPU Speed:`, `${data.avg * 1000}MHz`, false);
      msg.say(embed);
    });

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
