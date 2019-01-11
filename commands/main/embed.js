const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: `embed`,
      group: `main`,
      memberName: `embed`,
      description: `Embeds whatever you specify.`,
      examples: [`embed lul`],
      clientPermissions: [`MANAGE_MESSAGES`],
      args: [
        {
          key: `say`,
          prompt: `What would you like the bot to embed?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { say }) {
    msg.delete();
    let toSay = new RichEmbed();
    let author = msg.author;

    function checkAnon(toCheck) {
      if (toCheck.includes(`///anon`)) return true;
      else return false;
    }

    if (!checkAnon(msg.content)) {
      toSay
        .setAuthor(`${author.username} says:`, author.displayAvatarURL)
        .setDescription(say)
        .setColor(randomHexColor());

      msg.say(toSay);
    } else {
      toSay
        .setDescription(say.replace(`///anon`, ``))
        .setColor(randomHexColor());
      msg.say(toSay);
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
