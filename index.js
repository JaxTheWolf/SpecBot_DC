const {
  token,
  owner,
  prefix,
  disableEveryone,
  unknownCommandResponse
} = require(`./conf.json`);
const { CommandoClient } = require(`discord.js-commando`);
const path = require(`path`);
const fs = require(`fs`);

const client = new CommandoClient({
  commandPrefix: prefix,
  unknownCommandResponse: unknownCommandResponse,
  owner: owner,
  disableEveryone: disableEveryone
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`pc`, `General stuff about computers.`],
    /*[`mods`, `Moderation related commands.`],*/
    [`owner`, `Owner-only commands.`],
    [`info`, `Informative commands.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, `commands`));

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

const sqlite = require(`sqlite`);
const Commando = require(`discord.js-commando`);

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, `settings.sqlite3`))
      .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);

const cleanupFunc = async code => {
  await client.destroy();
  process.exit(code);
};

process.once("exit", cleanupFunc);
process.once("SIGINT", cleanupFunc);
process.once("SIGTERM", cleanupFunc);

client.login(token);
