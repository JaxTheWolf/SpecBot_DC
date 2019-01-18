const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const { RichEmbed } = require(`discord.js`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class GuildListCommand extends Command {
  constructor(client) {
    super(client, {
      name: `guildlist`,
      group: `info`,
      memberName: `guildlist`,
      description: `Lists all the guilds the bot is in.`,
      examples: [`guildlist`]
    });
  }
  run(msg) {
    let guildlist = this.client.guilds.map(g => g.name).join(`\n`);
    let embed = new RichEmbed()
      .setColor(randomHexColor())
      .setTitle(`Here's the list of guilds the bot is in:`)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setDescription(guildlist);

    msg.say(embed);

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
