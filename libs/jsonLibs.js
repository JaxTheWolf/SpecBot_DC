const https = require(`https`)

exports.sendImg = function (msg, reqUrl, field) {
  const randomHexColor = require(`random-hex-color`)
  const { sendEmbeddedImage, sendErrorEmbed } = require(`./embeds`)

  https.get(reqUrl, function onDone (response) {
    let data = ``
    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      return sendEmbeddedImage(msg, reqUrl, JSON.parse(data)[field], randomHexColor().replace(`#`, `0x`))
    })
  })
    .on(`error`, err => {
      return sendErrorEmbed(msg, `An error has occured`, err.message, 7500)
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
