const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: `say`,
      group: `main`,
      memberName: `say`,
      description: `Repeats whatever you specify.`,
      examples: [`say oko sux`],
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [{
        key: "say",
        prompt: "What would you like the bot to repeat?",
        type: "string"
      }]
    });
  }
  run(msg, {
    say
  }) {
    msg.delete();
    msg.say(say);
    log(__filename, msg);
  }
};
