exports.sendSimpleEmbededMessage = (msg, text, color, title, timeout = 0) => {
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
  return exports.sendSimpleEmbededMessage(msg, text, `0xff0000`, title, timeout)
}

exports.sendSuccessEmbed = (msg, title, text, timeout = 0) => {
  return exports.sendSimpleEmbededMessage(msg, text, `0x3cff00`, title, timeout)
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
