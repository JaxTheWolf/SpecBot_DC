exports.sendConf = function (msg, user, conf, dirname) {
  const fs = require(`fs`)
  const { RichEmbed } = require(`discord.js`)
  const randomHexColor = require(`random-hex-color`)
  const readFrom = `${dirname}/../../${conf}`

  function retrievePC (user) {
    fs.readFile(`${readFrom}/${user.id}.txt`, `utf8`, function onDone (
      err,
      data
    ) {
      if (err) {
        return msg.reply(`This person doesn't have a configuration yet!`)
      } else {
        const embed = new RichEmbed()
          .setTitle(`Here's ${user.username}'s configuration!`)
          .setAuthor(user.username, user.displayAvatarURL)
          .setDescription(`${data}`)
          .setColor(randomHexColor())
        msg.channel.send({
          embed
        })
      }
    })
  }

  if (user === ``) {
    retrievePC(msg.author)
  } else {
    retrievePC(user)
  }
}
