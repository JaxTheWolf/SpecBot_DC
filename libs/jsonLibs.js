const https = require(`https`)

exports.sendImg = function (msg, reqUrl, field) {
  const { RichEmbed } = require(`discord.js`)
  const randomHexColor = require(`random-hex-color`)

  https.get(reqUrl, function onDone (response) {
    let data = ``
    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      const embed = new RichEmbed()
        .setImage(JSON.parse(data)[field])
        .setFooter(`Images are fetched form ${reqUrl}.`)
        .setColor(randomHexColor())
      return msg.say(embed)
    })
  })
    .on(`error`, err => {
      return msg.say(`An error has occured. (${err.message})`)
    })
}

exports.fetchText = function (msg, emote, reqUrl, field) {
  https.get(reqUrl, function onDone (response) {
    let data = ``
    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      const getDeepProp = (obj, path) => (path.split(`.`).reduce((acc, part) => acc && acc[part], obj))
      return msg.say(`${emote} | ${getDeepProp(JSON.parse(data), field)}`)
    })
  })
}
