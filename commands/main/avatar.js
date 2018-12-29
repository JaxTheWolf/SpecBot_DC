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
  rhc
} = require(`../../randomHexColour`);

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: `avatar`,
      group: `main`,
      memberName: `avatar`,
      description: `Shows your or mentioned user's avatar.`,
      examples: [`avatar @oko123#8509`],
      args: [{
        key: "user",
        prompt: "Which user's avatar would you like to see?",
        type: "user",
        default: "",
        error: "That isn't a valid user mention!",
      }]
    });
  }
  run(msg, {
    user
  }) {
    try {
      let embed = new RichEmbed();

      if (user === "") {
        embed.setTitle(`Here's your avatar:`)
          .setImage(msg.author.avatarURL)
          .setColor(rhc);
        msg.say(embed);
      } else {
        embed.setTitle(`Here's ${user.username}'s avatar:`)
          .setImage(user.avatarURL)
          .setColor(rhc);
        msg.say(embed);
      }
    } catch {
      msg.say(`This person doesn't have an avatar set!`);
    }
    log(__filename, msg);
  }
};
