const {
  Command
} = require(`discord.js-commando`);

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: `reply`,
      group: `pc`,
      memberName: `reply`,
      description: `Replies with a Message.`,
      examples: [`reply`]
    });
  }
  run(msg) {
    console.log(`Reply used!`);
    return msg.say(`It's working! Yay!`);
  }
};
