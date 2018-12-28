const {
  Command
} = require(`discord.js-commando`);
const {
  RichEmbed
} = require(`discord.js`);
const {
  log
} = require(`../../logger`);

module.exports = class PC2Command extends Command {
  constructor(client) {
    super(client, {
      name: `pc2`,
      group: `pc`,
      memberName: `pc2`,
      description: `Replies with a user's second configuration`,
      examples: [`pc2 @oko123#8509`],
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

    fs.readFile(`${__dirname}/../../conf2/${msg.guild.id}/${owner.tag}.txt`, `utf8`, function(err, data) {
      if (err) {
        msg.reply(`This person doesn't have a configuration yet!`).then(log(__filename, msg));
        console.log(err);
      } else {
        let colour = `#` + (`00000` + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);

        const embed = new RichEmbed()
          .setTitle(`Here's ${user.username}'s configuration!`)
          .setDescription(`${data}`)
          .setColor(colour);
        msg.channel.send({
          embed
        }).then(log(__filename, msg));
      }
    });
  }
};
