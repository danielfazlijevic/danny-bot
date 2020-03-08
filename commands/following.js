const {
    db
} = require('../database.js');



module.exports = {
    name: 'following',
    description: 'List followed sites',
    async execute(message, args) {
        const snapshot = await db.collection('watched_sites').get();
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        })

        const following = data.map(element => `URL: ${element.url} | Added by: ${element.added_by} | ID: ${element.id}`);

        const followingMessage = following.join('\n');


        message.channel.send(`Here are the sites I'm currently following:\n${followingMessage}`);
    },
};