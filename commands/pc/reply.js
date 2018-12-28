const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

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
    return msg.say(`It's working! Yay!`).then(log(__filename, msg));
  }
};
