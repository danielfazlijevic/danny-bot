const {
    db,
    admin
} = require('../database.js');



module.exports = {
    name: 'unsubscribe',
    description: 'Unsubscribe to site changes. You will not get mentioned if site has changed.',
    usage: '<id>',
    args: true,
    async execute(message, args) {
        const docID = args[0];

        const {
            username,
            id
        } = message.author;
        console.log('Removing', username, 'from subscribed users.');

        try {
            console.log('Id is: ', docID);
            const subscription = {
                id,
                username
            }


            const siteToUnsubscribeRef = await db.collection('watched_sites').doc(docID);

            siteToUnsubscribeRef.update({
                subscriptions: admin.firestore.FieldValue.arrayRemove(subscription)
            });

            const siteDataSnapshot = await siteToUnsubscribeRef.get();
            const siteData = siteDataSnapshot.data();

            message.channel.send(`I'll stop mentioning you when the site ${siteData.url} gets changed.`);


        } catch (err) {
            console.error(err);
            message.channel.send('Site not found!');
        }

    },
};