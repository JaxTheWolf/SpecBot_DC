const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

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
        default: " ",
        error: "That isn't a valid user mention!",
      }]
    });
  }
  run(msg, {
    user
  }) {
    msg.say(msg.user.avatarURL);
  }
};
