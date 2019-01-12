const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class ReportCommand extends Command {
  constructor(client) {
    super(client, {
      name: `report`,
      aliases: [`repo`, `specbotreport`, `spreport`, `sprepo`],
      group: `main`,
      memberName: `report`,
      description: `Reports a user to the server owner.`,
      examples: [`report @user#0000 Hate messages`],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to report?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `What's the reason?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { user, reason }) {
    let guildOwner = msg.guild.owner.user;

    const embed = new RichEmbed()
      .setAuthor(
        `Report from ${msg.author.username}:`,
        msg.author.displayAvatarURL
      )
      .setDescription(`**Remember to punish the offending user if needed!**`)
      .setColor(randomHexColor())
      .addField(`User:`, `**${user.tag}**`, false)
      .addField(`Reason:`, `**${reason}**`, false)
      .addField(`Guild:`, `**${msg.guild.name}**`, false)
      .addField(`Channel:`, `**${msg.channel.name}**`, false)
      .addField(
        `If you feel that this report is unnecessary and/or you believe the command has been abused:`,
        ` you may want to "punish" the author (**${msg.author.tag}**).`,
        false
      )
      .setFooter(new Date().toUTCString(), user.displayAvatarURL);
    /*msg.say(embed); uncomment this for debugging purposes.*/
    guildOwner
      .send(embed)
      .then(
        msg.reply(`User \`${user.tag}\` has been reported to the server owner!`)
      );

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
