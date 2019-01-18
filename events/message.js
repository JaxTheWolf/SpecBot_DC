module.exports = (client, msg) => {
  const Enmap = require(`enmap`);
  client.points = new Enmap({ name: `points` });

  if (msg.author.bot) return;
  if (msg.guild) {
    (async function() {
      await client.points.defer;
      const key = `${msg.guild.id}-${msg.author.id}`;

      client.points.ensure(key, {
        user: msg.author.id,
        guild: msg.guild.id,
        points: 0,
        level: 1
      });

      client.points.inc(key, `points`);

      const curLevel = Math.floor(
        0.25 * Math.sqrt(client.points.get(key, `points`))
      );

      if (client.points.get(key, `level`) < curLevel) {
        msg.reply(`You've leveled up to level **${curLevel}**!`);
        client.points.set(key, curLevel, `level`);
      }
    })();
  }
};
