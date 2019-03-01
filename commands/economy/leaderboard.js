const SQLite = require(`better-sqlite3`)
const log = require(`node-file-logger`)
const { basename } = require(`path`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class LeaderboardCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`lb`, `leaders`, `top10`, `top`],
      description: `Shows the top 10 users (points-wise)`,
      examples: [`leaderboard`],
      group: `economy`,
      guildOnly: true,
      memberName: `leaderboard`,
      name: `leaderboard`
    })
  }
  run (msg) {
    try {
      const sql = new SQLite(`${__dirname}/../../DBs/scores.sqlite3`)
      const top10 = sql
        .prepare('SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;')
        .all(msg.guild.id)

      const embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setColor(randomHexColor())
        .setDescription(`Our top 10 points leaders!`)
        .setTitle('Leaderboard')

      for (const data of top10) {
        embed.addField(this.client.users.get(data.user).tag, `**${data.points}** points (level **${data.level}**)`)
      }
      log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)
      return msg.say({ embed })
    } catch (e) {
      msg.delete()
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
