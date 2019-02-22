exports.sendConf = function (msg, user, conf, dirname) {
  const { RichEmbed } = require(`discord.js`)
  const randomHexColor = require(`random-hex-color`)
  const SQLite = require(`better-sqlite3`)
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

  function retrievePC (user) {
    try {
      const embed = new RichEmbed()
        .setTitle(`Here's ${user.username}'s configuration!`)
        .setAuthor(user.username, user.displayAvatarURL)
        .setDescription(`${db.prepare(`SELECT conf FROM ${conf} WHERE id = '${user.id}';`).get().conf}`)
        .setColor(randomHexColor())
      msg.channel.send({ embed })
    } catch (e) {
      if (e || typeof row === `undefined`) {
        return msg.reply(`This person doesn't have a configuration yet!`)
      } else if (e) {
        return msg.say(`An error has occured. (\`${e.message}\`)`)
      }
    }
  }

  if (user === ``) {
    retrievePC(msg.author)
  } else {
    retrievePC(user)
  }
}
