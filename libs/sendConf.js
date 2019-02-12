exports.sendConf = function (msg, user, conf, dirname) {
  const { RichEmbed } = require(`discord.js`)
  const randomHexColor = require(`random-hex-color`)
  const sqlite3 = require(`sqlite3`)
  const db = new sqlite3.Database(`${dirname}/../../DBs/${conf}.sqlite3`)

  function retrievePC (user) {
    db.get(`SELECT conf FROM configs WHERE id = ${user.id}`, function onDone (err, row) {
      if (err || typeof row === `undefined`) {
        return msg.reply(`This person doesn't have a configuration yet!`)
      } else if (err) {
        return msg.say(`An error has occured. (\`${err.message}\`)`)
      } else {
        const embed = new RichEmbed()
          .setTitle(`Here's ${user.username}'s configuration!`)
          .setAuthor(user.username, user.displayAvatarURL)
          .setDescription(`${row.conf}`)
          .setColor(randomHexColor())
        msg.channel.send({ embed })
      }
    })
  }

  if (user === ``) {
    retrievePC(msg.author)
  } else {
    retrievePC(user)
  }
}
