const {
    db,
    admin
} = require('../database.js');



module.exports = {
    name: 'subscribe',
    description: 'Subscribe to site changes. You will get mentioned if site has changed.',
    usage: 'subscribe <url> ',
    args: true,
    async execute(message, args) {
        if (!args[0]) return message.channel.send('Error. Usage: ', usage);
        const docID = args[0];

        const {
            username,
            id
        } = message.author;
        console.log('Adding', username, 'to subscribed users in');

        try {
            console.log('Id is: ', docID);
            const newSubscription = {
                id,
                username
            }


            const siteToSubscribeRef = await db.collection('watched_sites').doc(docID);
            
            siteToSubscribeRef.update({
                subscriptions: admin.firestore.FieldValue.arrayUnion(newSubscription)
            });

            const siteDataSnapshot = await siteToSubscribeRef.get();
            const siteData = siteDataSnapshot.data();

            message.channel.send(`I'll mention you when the site ${siteData.url} gets changed.`);


        } catch (err) {
            console.error(err);
            message.channel.send('Site not found!');
        }

    },
};