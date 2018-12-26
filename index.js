const conf = require(`./conf.json`);

const Commando = require(`discord.js-commando`);

const client = new Commando.Client({
    owner: conf.owner,
    commandPrefix: conf.prefix,
    unknownCommandResponse: conf.unknownCommandResponse,
});

const path = require(`path`);

client.registry
    .registerGroups([
        [`Main`, `Main commands regarding PCs`],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, `commands`));

const sqlite = require(`sqlite`);

client.setProvider(
    sqlite.open(path.join(__dirname, `settings.sqlite3`)).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.login(`${conf.token}`);