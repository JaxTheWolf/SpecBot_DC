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
    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }

    return msg.say(`It's working!`).then(log());
  }
};
