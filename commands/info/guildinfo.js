const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class GuildInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: `guildinfo`,
      aliases: [`ginfo`, `guild_info`, `g_info`],
      group: `info`,
      memberName: `guildinfo`,
      description: `Shows information about the guild.`,
      guildOnly: true,
      examples: [`guildinfo`]
    });
  }
  run(msg) {
    function checkBots(guild) {
      let botCount = 0;
      guild.members.forEach(member => {
        if (member.user.bot) botCount++;
      });
      return botCount;
    }

    function checkMembers(guild) {
      let memberCount = 0;
      guild.members.forEach(member => {
        if (!member.user.bot) memberCount++;
      });
      return memberCount;
    }

    function fetchEmojis(guild) {
      let emojiList = guild.emojis.map(e => e.toString()).join(" ");
      return emojiList === `` ? `None` : emojiList;
    }

    function channCount(guild, type) {
      let chann = 0;
      guild.channels.forEach(c => {
        if (c.type === type) chann++;
      });
      return chann;
    }

    let guild = msg.guild;
    let embed = new RichEmbed()
      .setColor(randomHexColor())
      .setTitle(`Here's some info about this guild:`)
      .setThumbnail(guild.iconURL)
      .addField(`Name:`, guild.name, false)
      .addField(
        `Owner:`,
        `${guild.owner.user.tag} (${guild.owner.user.id})`,
        false
      )
      .addField(`ID:`, guild.id, false)
      .addField(`Number of text channels:`, channCount(guild, `text`), false)
      .addField(`Number of voice channels:`, channCount(guild, `voice`), false)
      .addField(`Amount of members (total):`, guild.memberCount, false)
      .addField(`Bots:`, checkBots(guild), false)
      .addField(`Humans:`, checkMembers(guild), false)
      .addField(
        `Is this guild considered large? (250+ members):`,
        guild.large,
        false
      )
      .addField(`Region:`, guild.region, false)
      .addField(`Emojis:`, fetchEmojis(guild), false)
      .setFooter(`Guild created at:`)
      .setTimestamp(guild.createdAt);

    msg.say(embed);

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
