exports.delConf = function (msg, confirm, dirname, conf) {
  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const SQLite = require(`better-sqlite3`)
    const db = new SQLite(`${dirname}/../../DBs/configurations.sqlite3`)

    try {
      db.prepare(`DELETE FROM ${conf} WHERE id = '${msg.author.id}';`).run()
      msg.reply(`Your configuration has been successcully deleted!`)
    } catch (e) {
      return msg.reply(`You don't have a configuration yet or an error has occured. (\`${e.message}\`)`)
    }
  }
}
