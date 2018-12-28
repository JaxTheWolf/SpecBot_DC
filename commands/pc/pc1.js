const {
  Command
} = require(`discord.js-commando`);
const {
  RichEmbed
} = require(`discord.js`);
const {
  log
} = require(`../../logger`);
const {
  rhc
} = require(`../../randomHexColour`);

module.exports = class PC1Command extends Command {
  constructor(client) {
    super(client, {
      name: `pc1`,
      group: `pc`,
      memberName: `pc1`,
      description: `Replies with a user's configuration`,
      examples: [`pc1 @oko123#8509`],
      args: [{
        key: `user`,
        prompt: `Which user's configuration would you like to view?`,
        type: `user`
      }]
    });
  }
  run(msg, {
    user
  }) {
    const fs = require(`fs`);

    fs.readFile(`${__dirname}/../../conf1/${msg.guild.id}/${msg.guild.id}/${owner.tag}.txt`, `utf8`, function(err, data) {
      if (err) {
        msg.reply(`This person doesn't have a configuration yet!`);
        console.log(err);
      } else {
        const embed = new RichEmbed()
          .setTitle(`Here's ${user.username}'s configuration!`)
          .setDescription(`${data}`)
          .setColor(rhc);
        msg.channel.send({
          embed
        });
      }
    });
    log(__filename, msg);
  }
};
