const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: `leaderboard`,
      aliases: [`lb`, `leaders`, `top10`, `top`],
      group: `economy`,
      memberName: `leaderboard`,
      description: `Shows the top 10 users (points-wise)`,
      guildOnly: true,
      examples: [`leaderboard`]
    });
  }
  run(msg) {
    let filtered = this.client.points
      .filter(p => p.guild === msg.guild.id)
      .array();
    let sorted = filtered.sort((a, b) => b.points - a.points);
    let top10 = sorted.splice(0, 10);
    let embed = new RichEmbed()
      .setTitle(`Leaderboard`)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setDescription(`Our top 10 points leaders!`)
      .setColor(randomHexColor());

    for (const data of top10) {
      embed.addField(
        this.client.users.get(data.user).tag,
        `${data.points} points (level ${data.level})`,
        true
      );
    }
    msg.channel.send({ embed });
    client.points.evict(key);

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
