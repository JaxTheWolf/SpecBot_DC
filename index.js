const {
  token,
  owner,
  prefix,
  disableEveryone,
  unknownCommandResponse
} = require(`./conf.json`);

const {
  CommandoClient
} = require(`discord.js-commando`);
const path = require(`path`);

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
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, `commands`));

client.on(`ready`, () => {
  console.log(`Logged in!`);
  client.user.setActivity(`in ${client.guilds.size} servers`);
});

const sqlite = require(`sqlite`);
const Commando = require(`discord.js-commando`);

client.setProvider(
  sqlite.open(path.join(__dirname, `settings.sqlite3`)).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.login(token);
