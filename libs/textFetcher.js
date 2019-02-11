exports.fetchText = function (msg, emote, reqUrl, field) {
  const https = require(`https`)

  https
    .get(reqUrl, function onDone (response) {
      let data = ``
      response.on(`data`, chunk => {
        data += chunk
      })
      response.on(`end`, () => {
        msg.say(`${emote} | ${JSON.parse(data)[field]}`)
      })
    })
}
