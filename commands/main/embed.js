const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);
const {
  RichEmbed
} = require(`discord.js`);
const {
  randomHexColor
} = require(`random-hex-color`);

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: `embed`,
      group: `main`,
      memberName: `embed`,
      description: `Embeds whatever you specify.`,
      examples: [`embed lul`],
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [{
        key: "say",
        prompt: "What would you like the bot to embed?",
        type: "string"
      }]
    });
  }
  run(msg, {
    say
  }) {
    msg.delete();

    let toSay = new RichEmbed()
      .setTitle(`${msg.author.username} says:`)
      .setDescription(say)
      .setColor(randomHexColor);

    msg.say(toSay);
    log(__filename, msg);
  }
};
