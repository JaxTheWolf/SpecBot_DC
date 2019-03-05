const {
  disableEveryone,
  owner,
  prefix,
  token,
  unknownCommandResponse
} = require(`./configs/conf.json`)
const fs = require(`fs`)
const log = require(`node-file-logger`)
const sqlite = require(`sqlite`)
const { CommandoClient, SQLiteProvider } = require(`discord.js-commando`)
const { join } = require(`path`)
const { options } = require(`./configs/options`)
log.SetUserOptions(options)

const client = new CommandoClient({
  commandPrefix: prefix,
  disableEveryone: disableEveryone,
  owner: owner,
  unknownCommandResponse: unknownCommandResponse
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`settings`, `Guild specific settings`],
    [`pc`, `General stuff about computers.`],
    [`economy`, `Economy related commands.`],
    [`animals`, `All sorts of animal related commands.`],
    [`fun`, `Various fun commands.`],
    [`mods`, `Moderation related commands.`],
    [`owner`, `Owner-only commands.`],
    [`info`, `Informative commands.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval_: false
  })
  .registerCommandsIn(join(__dirname, `commands`))

fs.readdir(`./events/`, (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith(`.js`)) return
    const event = require(`./events/${file}`)
    const eventName = file.split(`.`)[0]
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

// Temp event handler in index.js. Doesn't work in ./events for some reason.
client.on(`commandRun`, (command, promise, message) => {
  log.Info(`${command.name} was used by ${message.author.tag}.`)
})

client.setProvider(
  sqlite.open(join(`${__dirname}/DBs`, `settings.sqlite3`))
    .then(db => new SQLiteProvider(db)))
  .catch(console.error)

async function cleanupFunc (code) {
  await client.destroy()
  process.exit(code)
}

process.once(`SIGINT`, cleanupFunc)
process.once(`SIGTERM`, cleanupFunc)
process.once(`exit`, cleanupFunc)

client.login(token)
