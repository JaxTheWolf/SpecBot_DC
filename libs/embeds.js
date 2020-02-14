const randomHexColor = require(`random-hex-color`)

exports.sendSimpleEmbededMessage = (msg, title, text, color, timeout = 0) => {
  const promise = msg.embed({
    author: { name: `${msg.author.username} `, icon_url: msg.author.displayAvatarURL },
    color: parseInt(color),
    description: text,
    title: title
  })
  if (timeout !== 0) {
    promise.then((reply) => {
      reply.delete(timeout).catch(() => undefined)
    })
  }
  return promise
}

exports.sendErrorEmbed = (msg, title, text, timeout = 0) => {
  return exports.sendSimpleEmbededMessage(msg, title, text, `0xff0000`, timeout)
}

exports.sendSuccessEmbed = (msg, title, text, timeout = 0) => {
  return exports.sendSimpleEmbededMessage(msg, title, text, `0x3cff00`, timeout)
}

exports.sendEmbeddedImage = (msg, footUrl, url, color, title = ``, description = ``) => {
  return msg.embed({
    author: { name: `${msg.author.username}`, icon_url: msg.author.displayAvatarURL },
    color: parseInt(color),
    footer: { text: footUrl === `` ? `` : `Images are fetched from ${footUrl}.` },
    image: { url },
    title: title,
    description: description
  })
}

exports.hexColorWith0x = () => {
  return randomHexColor().replace(`#`, `0x`)
}
