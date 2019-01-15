const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class XYZCommand extends Command {
  constructor(client) {
    super(client, {
      name: `emotes`,
      group: `info`,
      memberName: `emotes`,
      description: `Sends a message containing all server emotes.`,
      guildOnly: true,
      examples: [emotes]
    });
  }
  run(msg) {
    function fetchEmojis(guild) {
      let emojiList = guild.emojis.map(e => e.toString()).join(" ");
      return emojiList === `` ? `None` : emojiList;
    }

    msg.say(fetchEmojis(msg.guild));

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
