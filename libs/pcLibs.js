const SQLite = require(`better-sqlite3`)

exports.delConf = function (msg, confirm, dirname, conf) {
  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

    try {
      db.prepare(`DELETE FROM ${conf} WHERE id = '${msg.author.id}';`).run()
      return msg.reply(`Your configuration has been successcully deleted!`)
    } catch (e) {
      return msg.reply(`You don't have a configuration yet or an error has occured. (\`${e.message}\`)`)
    }
  }
}

exports.editConf = function (msg, component, newCmp, dirname, conf) {
  const rx = new RegExp(`^` + component + `:([\\s\\w].+)$`, `gmi`)
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
  const allowed = [
    `CPU`,
    `GPU`,
    `RAM`,
    `CASE`,
    `MOBO`,
    `PSU`,
    `COOLER`,
    `STORAGE`,
    `SCREEN`,
    `KEYBOARD`,
    `MOUSE`,
    `HEADSET`,
    `EXTRA`
  ]
  let res

  if (!allowed.includes(component.toUpperCase())) {
    return msg.reply(`\`${component}\` is not a valid component!`)
  } else {
    try {
      const row = db.prepare(`SELECT conf FROM ${conf} WHERE id = '${msg.author.id}';`).get()
      res = row.conf.replace(rx, `${component.toUpperCase()}: ${newCmp}`)
      db.prepare(`UPDATE ${conf} SET conf = '${res}' WHERE id = '${msg.author.id}';`).run()
      return msg.reply(`Configuration updated succesfully!`)
    } catch (e) {
      if (e.message === `Cannot read property 'conf' of undefined`) {
        return msg.reply(`You don't have a configuration yet!`)
      } else {
        return msg.reply(`There was a problem while saving your configuration. (\`${e.message}\`)`)
      }
    }
  }
}

exports.sendConf = function (msg, user, conf, dirname) {
  const { RichEmbed } = require(`discord.js`)
  const randomHexColor = require(`random-hex-color`)
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

  function retrievePC (user) {
    try {
      const embed = new RichEmbed()
        .setTitle(`Here's ${user.username}'s configuration!`)
        .setAuthor(user.username, user.displayAvatarURL)
        .setDescription(`${db.prepare(`SELECT conf FROM ${conf} WHERE id = '${user.id}';`).get().conf}`)
        .setColor(randomHexColor())
      return msg.say(embed)
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

exports.setConf = function (msg, content, conf, dirname) {
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

  try {
    db.prepare(`INSERT INTO ${conf}(id, conf) VALUES ('${msg.author.id}', '${content}');`).run()
    return msg.reply(`Configuration saved succesfully!`)
  } catch (e) {
    if (e.message.includes(`UNIQUE constraint failed`)) {
      return msg.reply(`You already own a configuration!`)
    } else {
      return msg.reply(`An error has occured while saving your configuration. (\`${e.message}\`)`)
    }
  }
}
