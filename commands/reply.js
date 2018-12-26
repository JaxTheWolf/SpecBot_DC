const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'main',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }
    run(msg) {
        return msg.say(`It's working!`);
    }
};