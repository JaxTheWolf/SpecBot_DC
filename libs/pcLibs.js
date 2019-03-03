const SQLite = require(`better-sqlite3`)
const { sendErrorEmbed, sendSimpleEmbededMessage, sendSuccessEmbed } = require(`./embeds`)

exports.delConf = function (msg, confirm, dirname, conf) {
  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
    try {
      db.prepare(`DELETE FROM ${conf} WHERE id = '${msg.author.id}';`).run()
      return sendSuccessEmbed(msg, `✅ Configuration successfully deleted!`, ``, 7500)
    } catch (e) {
      return msg.delete().then(sendErrorEmbed(msg, `❌ You don't have a configuration yet or an error has occured.`, ``, 7500).catch())
    }
  }
}

exports.editConf = function (msg, component, newCmp, dirname, conf) {
  const allowed = [
    `CASE`,
    `COOLER`,
    `CPU`,
    `EXTRA`,
    `GPU`,
    `HEADSET`,
    `KEYBOARD`,
    `MOBO`,
    `MOUSE`,
    `PSU`,
    `RAM`,
    `SCREEN`,
    `STORAGE`
  ]
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
  const rx = new RegExp(`^` + component + `:([\\s\\w].+)$`, `gmi`)
  let res

  if (!allowed.includes(component.toUpperCase())) {
    msg.delete().catch()
    return sendErrorEmbed(msg, `❌ \`${component}\` is not a valid component!`, ``, 7500)
  } else {
    try {
      const row = db.prepare(`SELECT conf FROM ${conf} WHERE id = '${msg.author.id}';`).get()
      res = row.conf.replace(rx, `${component.toUpperCase()}: ${newCmp}`)
      db.prepare(`UPDATE ${conf} SET conf = '${res}' WHERE id = '${msg.author.id}';`).run()
      return sendSuccessEmbed(msg, `✅ Configuration updated successfully!`, ``, 7500)
    } catch (e) {
      if (e.message === `Cannot read property 'conf' of undefined`) {
        return msg.delete().then(sendErrorEmbed(msg, `❌ You don't have a configuration yet!`, ``, 7500)).catch()
      } else {
        return msg.delete().then(sendErrorEmbed(msg, `An error has occured while saving your configuration`, e.message, 7500)).catch()
      }
    }
  }
}

exports.sendConf = function (msg, user, conf, dirname) {
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)
  const randomHexColor = require(`random-hex-color`)

  function retrievePC (user) {
    try {
      return sendSimpleEmbededMessage(msg, db.prepare(`SELECT conf FROM ${conf} WHERE id = '${user.id}';`).get().conf,
        randomHexColor().replace(`#`, `0x`),
        `Here's ${user.username}'s configuration!`)
    } catch (e) {
      if (e || typeof row === `undefined`) {
        return msg.delete().then(sendErrorEmbed(msg, `❌ This person doesn't have a configuration yet!`, ``, 7500)).catch()
      } else if (e) {
        return msg.delete().then(sendErrorEmbed(msg, `An error has occured`, e.message, 7500)).catch()
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
    return sendSuccessEmbed(msg, `✅ Configuration saved successfully!`, ``, 7500)
  } catch (e) {
    if (e.message.includes(`UNIQUE constraint failed`)) {
      return msg.delete().then(sendErrorEmbed(msg, `❌ You already own a configuration!`, ``, 7500).catch())
    } else {
      msg.delete().then(sendErrorEmbed(msg, `An error has occured while saving your configuration`, e.message, 7500)).catch()
    }
  }
}
