const { version } = require(`../package.json`)
exports.setActivity = client => {
  client.user.setActivity(`in ${client.guilds.size} servers|-help|v.${version}`)
}

exports.setRandomActivity = client => {
  const playing = [
    `yourself`,
    `a prank on you`,
    `literally nothing`,
    `games you can't afford`,
    `with fire`,
    `with Playing with Playing with`,
    `with your feelings`,
    `Half-Life 3 Early Access`,
    `with ${client.users.size} users`,
    `with bots`,
    `nothing because of EU`,
    `alone :(`,
    `с товарищ`,
    `hide and seek with FBI`,
    `far away from Putin`,
    `sudo rm -rf /*`,
    `in ${client.guilds.size} servers|-help`,
    `version v${version}`,
    `myslef`,
    `absolutely nothing`
  ]

  client.user.setActivity(playing[Math.floor(Math.random() * playing.length)])
}
