const {
  Command
} = require(`discord.js-commando`);

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: `say`,
      group: `main`,
      memberName: `say`,
      description: `Repeats whatever you specify.`,
      examples: [`say oko sux`],
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
    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }
    msg.delete();
    msg.say(say).then(console.log());
  }
};
