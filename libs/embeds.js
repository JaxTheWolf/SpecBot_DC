exports.sendSimpleEmbededMessage = function (msg, text, color, title, timeout = 0) {
  const promise = msg.embed({
    title: title,
    color: parseInt(color),
    author: {
      name: `${msg.author.username} `,
      icon_url: msg.author.displayAvatarURL
    },
    description: `${text}`
  })
  if (timeout !== 0) {
    promise.then((reply) => {
      reply.delete(timeout).catch(() => undefined)
    })
  }
  return promise
}

exports.sendErrorEmbed = function (msg, title, text, timeout = 0) {
  return exports.sendSimpleEmbededMessage(msg, text, `0xff0000`, title, timeout)
}

exports.sendSuccessEmbed = function (msg, title, text, timeout = 0) {
  return exports.sendSimpleEmbededMessage(msg, text, `0x3cff00`, title, timeout)
}

exports.sendEmbeddedImage = function (msg, footUrl, url, color, title = ``) {
  return msg.embed({
    color: parseInt(color),
    title: title,
    author: {
      name: `${msg.author.username}`,
      icon_url: msg.author.displayAvatarURL
    },
    image: { url },
    footer: { text: footUrl === `` ? `` : `Images are fetched from ${footUrl}.` }
  })
}
