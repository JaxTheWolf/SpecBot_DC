exports.delConf = function (msg, confirm, dirname, conf) {
  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const sqlite3 = require(`sqlite3`)
    const owner = msg.author
    const db = new sqlite3.Database(`${dirname}/../../DBs/${conf}.sqlite3`)

    db.run(`DELETE FROM configs WHERE id = ${owner.id}`, function onDone (err) {
      if (err) {
        return msg.reply(`You don't have a configuration yet or an error has occured. (\`${err.message}\`)`)
      } else {
        msg.reply(`Your configuration has been successcully deleted!`)
      }
    })
  }
}
