exports.editConf = function (msg, component, newCmp, dirname, conf) {
  const fs = require(`fs`)
  const owner = msg.author
  const rx = new RegExp(`^` + component + `:([\\s\\w].+)$`, `gmi`)
  let res
  const dir = `${dirname}/../../${conf}`
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
    fs.readFile(`${dir}/${owner.id}.txt`, `utf8`, function onDone (err, data) {
      if (err) {
        msg.reply(
          `You don't have a configuration yet or an error has occured.`
        )
        console.log(err)
        res = null
      } else {
        res = data.replace(rx, `${component.toUpperCase()}: ${newCmp}`)

        fs.writeFile(`${dir}/${owner.id}.txt`, res, function onDone (err) {
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
