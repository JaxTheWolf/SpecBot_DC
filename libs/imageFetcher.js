exports.sendImg = function (msg, reqUrl, footer, field) {
  const { RichEmbed } = require(`discord.js`)
  const https = require(`https`)
  const randomHexColor = require(`random-hex-color`)
  https
    .get(reqUrl, function onDone (response) {
      let data = ``
      response.on(`data`, chunk => {
        data += chunk
      })
      response.on(`end`, () => {
        const embed = new RichEmbed()
          .setImage(JSON.parse(data).field)
          .setFooter(footer)
          .setColor(randomHexColor())
        msg.say(embed)
      })
    })
    .on(`error`, err => {
      msg.say(`An error has occured. (${err.message})`)
    })
}
