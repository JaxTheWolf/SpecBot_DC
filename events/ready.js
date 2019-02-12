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

  const createTable = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS configs(id INTEGER PRIMARY KEY, conf TEXT NOT NULL)`)
  }

  const conf1DB = new sqlite3.Database(`./DBs/conf1.sqlite3`, (err) => {
    if (err) {
      console.log(`Error when creating the database`, err)
    } else {
      createTable(conf1DB)
    }
  })

  const conf2DB = new sqlite3.Database(`./DBs/conf2.sqlite3`, (err) => {
    if (err) {
      console.log(`Error when creating the database`, err)
    } else {
      createTable(conf2DB)
    }
  })

  const serverDB = new sqlite3.Database(`./DBs/server.sqlite3`, (err) => {
    if (err) {
      console.log(`Error when creating the database`, err)
    } else {
      createTable(serverDB)
    }
  })

  setActivity()

  const toLog = `Ready!`

  console.log(toLog)
  log.Info(toLog)
}
