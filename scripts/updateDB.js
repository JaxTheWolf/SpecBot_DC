const SQL = require(`sqlite3`)

const DB = new SQL.Database(`${__dirname}/../DBs/configurations.sqlite3`)
const stmt = DB.prepare(`SELECT * FROM conf1`)

stmt.all(function (err, rows) {
  if (err) throw err

  rows.forEach(row => {
    const obj = {}
    const arr = row.conf.split(`\n`)
    arr.forEach(line => {
      var key, val
      [key, ...val] = line.split(`: `)
      obj[key] = val.join(`: `).toString()
    })
    DB.prepare(`UPDATE conf1 SET conf = ? WHERE conf = ?;`).run(JSON.stringify(obj), row.conf)
  })
})
