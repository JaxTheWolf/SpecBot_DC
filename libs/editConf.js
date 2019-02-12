exports.editConf = function (msg, component, newCmp, dirname, conf) {
  const sqlite3 = require(`sqlite3`)
  const owner = msg.author
  const rx = new RegExp(`^` + component + `:([\\s\\w].+)$`, `gmi`)
  let res
  const db = new sqlite3.Database(`${dirname}/../../DBs/${conf}.sqlite3`)
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

  if (!allowed.includes(component.toUpperCase())) {
    return msg.reply(`\`${component}\` is not a valid component!`)
  } else {
    db.get(`SELECT conf FROM configs WHERE id = ${owner.id}`, function onDone (err, row) {
      if (err) {
        res = null
        return msg.reply(`You don't have a configuration yet or an error has occured.`)
      } else {
        res = row.conf.replace(rx, `${component.toUpperCase()}: ${newCmp}`)
        db.run(`UPDATE configs SET conf = '${res}' WHERE id = '${owner.id}'`, function onDone (err) {
          if (err) {
            return msg.say(
              `There was a problem while saving your file. (\`${err}\`)`
            )
          } else {
            msg.say(`Configuration saved succesfully!`)
          }
        })
      }
    })
  }
}
