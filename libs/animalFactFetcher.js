exports.fetchAnimalFact = function (msg, emote, reqUrl) {
  const https = require(`https`)

  https
    .get(reqUrl, function onDone (response) {
      let data = ``
      response.on(`data`, chunk => {
        data += chunk
      })
      response.on(`end`, () => {
        msg.say(`${emote} | ${JSON.parse(data).fact}`)
      })
    })
}
