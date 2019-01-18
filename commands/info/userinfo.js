const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: `userinfo`,
      aliases: [`uinfo`, `user_info`, `u_info`],
      group: `info`,
      memberName: `userinfo`,
      description: `Sends info about you or the tagged user (if any).`,
      guildOnly: true,
      examples: [`userinfo @user0000`],
      args: [
        {
          key: `member`,
          prompt: `Whose info would you want to see?`,
          default: ``,
          type: `member`
        }
      ]
    });
  }
  run(msg, { member }) {
    let embed = new RichEmbed();
    let playStat;

    if (member === ``) {
      let author = msg.author;
      let authorMember = msg.guild.members.get(author.id);
      try {
        playStat = authorMember.presence.game.name;
      } catch {
        playStat = `nothing`;
      }

      embed
        .setColor(randomHexColor())
        .setTitle(`Here's some info about you:`)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setThumbnail(author.displayAvatarURL)
        .addField(`Your **username** is:`, `**${author.username}**`, false)
        .addField(
          `Your **nickname** is:`,
          authorMember.nickname === null
            ? `**None**`
            : `**${authorMember.nickname}**`,
          false
        )
        .addField(`Your **ID** is:`, `**${author.id}**`, false)
        .addField(
          `You have **joined** this guild at:`,
          `**${authorMember.joinedAt}**`,
          false
        )
        .addField(
          `You are currently **${authorMember.presence.status}**`,
          `and **playing ${playStat}**`,
          false
        )
        .setFooter(`User created at:`)
        .setTimestamp(author.createdAt);
    } else {
      try {
        playStat = member.presence.game.name;
      } catch {
        playStat = `nothing`;
      }
      let user = member.user;
      embed
        .setColor(randomHexColor())
        .setTitle(`Here's some info about **${user.tag}**:`)
        .setThumbnail(user.displayAvatarURL)
        .addField(`Their **username** is:`, `**${user.username}**`, false)
        .addField(
          `Their **nickname** is:`,
          member.nickname === null ? `**None**` : `**${member.nickname}**`,
          false
        )
        .addField(`Their **ID** is:`, `**${user.id}**`, false)
        .addField(
          `They have **joined** this guild at:`,
          `**${member.joinedAt}**`,
          false
        )
        .addField(
          `They are currently **${member.presence.status}**`,
          `and **playing ${playStat}**`,
          false
        )
        .addField(`Are they a **bot user**?`, `**${user.bot}**`, false)
        .setFooter(`User created at:`)
        .setTimestamp(user.createdAt);
    }
    msg.say(embed);

    // TODO: (member): joinedAt, nickame, presence,
    // TODO: (user): displayAvatarURL, createdAt, id, username

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
