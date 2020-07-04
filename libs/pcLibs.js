const SQLite = require(`better-sqlite3`)
const { sendErrorEmbed, hexColorWith0x, sendSuccessEmbed } = require(`./embeds`)

exports.delConf = (msg, confirm, dirname, conf) => {
  let conf_
  conf === `server` ? conf_ = `server` : conf_ = `conf` + conf

  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
    try {
      db.prepare(`DELETE FROM ${conf_} WHERE id = '${msg.author.id}';`).run()
      return sendSuccessEmbed(msg, `✅ Configuration successfully deleted!`, ``, 7500)
    } catch (e) {
      return sendErrorEmbed(msg, `❌ You don't have a configuration yet or an error has occurred.`, ``, 7500)
    }
  }
}

exports.editConf = (msg, component, newCmp, dirname, conf) => {
  const allowed = [`CASE`, `COOLER`, `CPU`, `EXTRA`, `GPU`, `HEADSET`, `KEYBOARD`, `MOBO`, `MOUSE`, `PSU`, `RAM`, `SCREEN`, `STORAGE`]
  if (!allowed.includes(component.toUpperCase())) {
    return sendErrorEmbed(msg, `❌ \`${component}\` is not a valid component!`, ``, 7500)
  } else {
    const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
    try {
      const confObj = JSON.parse(db.prepare(`SELECT conf FROM ${`conf` + conf} WHERE id = '${msg.author.id}';`).get().conf)
      confObj[component.toUpperCase()] = newCmp
      db.prepare(`UPDATE ${`conf` + conf} SET conf = ? WHERE id = '${msg.author.id}';`).run(JSON.stringify(confObj))
      return sendSuccessEmbed(msg, `✅ Configuration updated successfully!`, ``, 7500)
    } catch (e) {
      if (e.message === `Cannot read property 'conf' of undefined`) {
        return sendErrorEmbed(msg, `❌ You don't have a configuration yet!`, ``, 7500)
      } else {
        return sendErrorEmbed(msg, `An error has occurred while saving your configuration`, e.message, 7500)
      }
    }
  }
}

exports.sendConf = (msg, user, conf, dirname) => {
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

  const retrievePC = (user) => {
    let conf_
    conf === `server` ? conf_ = `server` : conf_ = `conf` + conf

    try {
      const confObj = JSON.parse(db.prepare(`SELECT conf FROM ${conf_} WHERE id = '${user.id}';`).get().conf)
      const entries = Object.entries(confObj)
      const { RichEmbed } = require(`discord.js`)

      const re = new RichEmbed()
        .setTitle(`Here's ${user.username}'s configuration!`)
        .setColor(hexColorWith0x())
      for (let i = 0; i < entries.length; i++) {
        re.addField(entries[i][0], entries[i][1])
      }
      return msg.channel.send(re)
    } catch (e) {
      if (typeof confObj === `undefined`) {
        return sendErrorEmbed(msg, `❌ This person doesn't have a configuration yet!`, ``, 7500)
      } else if (e) {
        return sendErrorEmbed(msg, `An error has occurred`, e.message, 7500)
      }
    }
  }

  if (user === ``) {
    retrievePC(msg.author)
  } else {
    retrievePC(user)
  }
}

exports.setConf = (msg, content, conf, dirname) => {
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
  try {
    db.prepare(`INSERT INTO ${`conf` + conf}(id, conf) VALUES ('${msg.author.id}', ?);`).run(JSON.stringify(content))
    return sendSuccessEmbed(msg, `✅ Configuration saved successfully!`, ``, 7500)
  } catch (e) {
    if (e.message.includes(`UNIQUE constraint failed`)) {
      return sendErrorEmbed(msg, `❌ You already own a configuration!`, ``, 7500)
    } else {
      sendErrorEmbed(msg, `An error has occurred while saving your configuration`, e.message, 7500)
    }
  }
}
