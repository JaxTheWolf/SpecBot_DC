module.exports = client => {
  function setActivity () {
    const { version } = require(`../package.json`)
    client.user.setActivity(
      `in ${client.guilds.size} servers|-help|v.${version}`
    )
  }

  const { options } = require(`../configs/options`)
  const sqlite3 = require(`sqlite3`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  const db = new sqlite3.Database(`./DBs/configurations.sqlite3`, (err) => {
    if (err) {
      console.log(`Error when creating the database`, err)
    } else {
      db.run(`CREATE TABLE IF NOT EXISTS conf1(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`)
      db.run(`CREATE TABLE IF NOT EXISTS conf2(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`)
      db.run(`CREATE TABLE IF NOT EXISTS server(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`)
    }
  })

  setActivity()

  const toLog = `Ready!`

  console.log(toLog)
  log.Info(toLog)
}
