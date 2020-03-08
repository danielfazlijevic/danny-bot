const { db } = require('../database.js');
const { properURL } = require('../utils/transforming.js');



module.exports = {
	name: 'follow',
    description: 'Follow a website for changes.',
    usage: 'follow <url> <selector>',
	args: true,
	async execute(message, args) {
        if(!args[0]) return message.channel.send('Error. Usage: ', usage);
        const url = properURL(args[0]);
        const selector = args.slice(1).join(' ') || 'a';   
        const { username } = message.author;
        console.log('Adding', url, 'to watched sites. Selector:', selector);
        await db.collection('watched_sites').add({
            url,
            selector,
            entries: [],
            subscriptions: [],
            added_by: username 
        });

        message.channel.send(`I'll follow ${url} for changes.`);
	},
};