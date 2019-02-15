module.exports = client => {
  function setActivity () {
    const { version } = require(`../package.json`)
    client.user.setActivity(
      `in ${client.guilds.size} servers|-help|v.${version}`
    )
  }

  const { options } = require(`../configs/options`)
  const SQLite = require(`better-sqlite3`)
  const sql = new SQLite(`./DBs/scores.sqlite3`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  const confDB = new SQLite(`./DBs/configurations.sqlite3`)
  confDB.prepare(`CREATE TABLE IF NOT EXISTS conf1(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`).run()
  confDB.prepare(`CREATE TABLE IF NOT EXISTS conf2(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`).run()
  confDB.prepare(`CREATE TABLE IF NOT EXISTS server(id INTEGER PRIMARY KEY, conf TEXT NOT NULL);`).run()

  const table = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';`).get()
  if (!table[`count(*)`]) {
    sql.prepare(`CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run()
    sql.prepare(`CREATE UNIQUE INDEX idx_scores_id ON scores (id);`).run()
    sql.pragma(`synchronous = 1`)
    sql.pragma(`journal_mode = wal`)
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare(`SELECT * FROM scores WHERE user = ? AND guild = ?`)
  client.setScore = sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);`)
  setActivity()

  log.Info(`Ready!`)
}
