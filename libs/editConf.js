exports.editConf = function (msg, component, newCmp, dirname, conf) {
  const SQLite = require(`better-sqlite3`)
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
      msg.reply(`Configuration updated succesfully!`)
    } catch (e) {
      if (e.message === `Cannot read property 'conf' of undefined`) {
        return msg.reply(`You don't have a configuration yet!`)
      } else {
        return msg.reply(`There was a problem while saving your configuration. (\`${e.message}\`)`)
      }
    }
  }
}
