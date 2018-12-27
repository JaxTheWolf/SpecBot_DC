const {
  Command
} = require(`discord.js-commando`);

module.exports = class Setpc1Command extends Command {
  constructor(client) {
    super(client, {
      name: `setpc1`,
      group: `pc`,
      memberName: `setpc1`,
      description: `Sets a computer.`,
      examples: [`setpc1`]
    });
  }
  run(msg) {
    console.log(`setpc1 used!`);
    return msg.say(`Test`);
  }
};
