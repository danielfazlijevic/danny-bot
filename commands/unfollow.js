const {
    db
} = require('../database.js');

module.exports = {
    name: 'unfollow',
    description: 'Follow a website for changes.',
    usage: '<id>',
    args: true,
    async execute(message, args) {
        try {
            const docID = args[0];
            const siteToRemoveRef = await db.collection('watched_sites').doc(docID);
            const siteToRemoveData = (await siteToRemoveRef.get()).data();;

            await siteToRemoveRef.delete();

            message.channel.send(`I'll stop following ${siteToRemoveData.url} for changes.`);
        } catch (err) {
            console.error(err);
            message.channel.send('You sure that ID exists?');
        }
    },
};