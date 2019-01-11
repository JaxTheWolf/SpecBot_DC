const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: `avatar`,
      aliases: [`pfp`],
      group: `main`,
      memberName: `avatar`,
      description: `Shows your or mentioned user's avatar.`,
      examples: [`avatar @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's avatar would you like to see?`,
          type: `user`,
          default: ``,
          error: `That isn't a valid user mention!`
        }
      ]
    });
  }
  run(msg, { user }) {
    let embed = new RichEmbed();

    if (user === ``) {
      embed
        .setTitle(`Here's your avatar:`)
        .setImage(msg.author.displayAvatarURL)
        .setColor(rhc);
      msg.say(embed);
    } else {
      embed
        .setTitle(`Here's ${user.username}'s avatar:`)
        .setImage(user.displayAvatarURL)
        .setColor(randomHexColor());
      msg.say(embed);
    }
    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
