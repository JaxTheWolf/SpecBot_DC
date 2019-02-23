exports.setConf = function (msg, content, conf, dirname) {
  const SQLite = require(`better-sqlite3`)
  const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

  try {
    db.prepare(`INSERT INTO ${conf}(id, conf) VALUES ('${msg.author.id}', '${content}');`).run()
    msg.reply(`Configuration saved succesfully!`)
  } catch (e) {
    if (e.message.includes(`UNIQUE constraint failed`)) {
      return msg.reply(`You already own a configuration!`)
    } else {
      return msg.reply(`An error has occured while saving your configuration. (\`${e.message}\`)`)
    }
  }
}
