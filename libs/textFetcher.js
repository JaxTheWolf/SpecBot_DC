exports.fetchText = function (msg, emote, reqUrl, field) {
  const https = require(`https`)

  https
    .get(reqUrl, function onDone (response) {
      let data = ``
      response.on(`data`, chunk => {
        data += chunk
      })
      response.on(`end`, () => {
        const getDeepProp = (obj, path) => (
          path.split('.').reduce((acc, part) => acc && acc[part], obj)
        )
        msg.say(`${emote} | ${getDeepProp(JSON.parse(data), field)}`)
      })
    })
}
