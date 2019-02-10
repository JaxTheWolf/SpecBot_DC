exports.setConf = function (msg, content, conf, dirname) {
  const owner = msg.author
  const fs = require(`fs`)
  const writeTo = `${dirname}/../../${conf}`

  fs.writeFile(`${writeTo}/${owner.id}.txt`, content, function onError (err) {
    if (err) {
      return msg.say(`There was a problem while saving your file. (\`${err}\`)`)
    } else {
      msg.say(`Configuration saved succesfully!`)
    }
  })
}
