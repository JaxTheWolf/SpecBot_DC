exports.delConf = function (msg, confirm, dirname, conf) {
  if (confirm === `no`) {
    return msg.reply(`Cancelled command.`)
  } else {
    const fs = require(`fs`)
    const owner = msg.author
    const delFrom = `${dirname}/../../${conf}`

    fs.unlink(`${delFrom}/${owner.id}.txt`, function onError (err) {
      if (err) {
        console.log(err)
        return msg.reply(
          `You don't have a configuration yet or an error has occured. (\`${
            err
          }\`)`
        )
      } else {
        msg.reply(`Your configuration has been successcully deleted!`)
      }
    })
  }
}
