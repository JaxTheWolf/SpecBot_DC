exports.setConf = function (msg, content, conf, dirname) {
  const sqlite3 = require(`sqlite3`)
  const owner = msg.author
  const db = new sqlite3.Database(`${dirname}/../../DBs/${conf}.sqlite3`)

  db.run(`INSERT INTO configs(id, conf) VALUES ('${owner.id}', '${content}')`, function onDone (err, row) {
    if (err === null) {
      msg.say(`Configuration saved succesfully!`)
    } else if (err.code === `SQLITE_CONSTRAINT`) {
      return msg.say(`You already have a configuration set!`)
    } else {
      return msg.say(`There was a problem while saving your config. (\`${err.message}\`)`)
    }
  })
}
