module.exports = client => {
  const SQLite = require(`better-sqlite3`)
  const { Info, SetUserOptions } = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  const { setActivity, setRandomActivity } = require(`../libs/eventLibs`)
  SetUserOptions(options)

  const createTable = (sql, tablename, args) => {
    sql.prepare(`CREATE TABLE IF NOT EXISTS ${tablename}(${args});`).run()
  }

  const sql = new SQLite(`./DBs/scores.sqlite3`)
  const statements = {
    scores: sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';`),
    conf1: sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'conf1';`),
    conf2: sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'conf2';`),
    server: sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'server';`)
  }

  for (const prop in statements) {
    let sql = new SQLite(`./DBs/scores.sqlite3`)
    switch (prop) {
    case `scores`:
      if (!statements[prop].get()[`count(*)`]) {
        createTable(sql, `scores`, `id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, money INTEGER`)
        sql.prepare(`CREATE UNIQUE INDEX idx_scores_id ON scores (id);`).run()
        sql.pragma(`synchronous = 1;`)
        sql.pragma(`journal_mode = wal;`)
      }
      break
    default:
      sql = new SQLite(`./DBs/configurations.sqlite3`)
      if (!statements[prop].get()[`count(*)`]) {
        createTable(sql, prop, `id INTEGER PRIMARY KEY, conf TEXT NOT NULL`)
        sql.pragma(`synchronous = 1;`)
        sql.pragma(`journal_mode = wal;`)
      }
    }
  }

  client.getScore = sql.prepare(`SELECT * FROM scores WHERE user = ? AND guild = ?`)
  client.setScore = sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points, level, money) VALUES (@id, @user, @guild, @points, @level, @money);`)
  client.removeRow = sql.prepare(`DELETE FROM scores WHERE user = ?`)

  setActivity(client)

  setInterval(() => {
    setRandomActivity(client)
  }, Math.floor(Math.random() * (18000000 - 10000)) + 10000)

  Info(`Ready!`)
}
