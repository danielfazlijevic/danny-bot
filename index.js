const fs = require('fs');
const Discord = require('discord.js');

// LOAD ENVIROMENTAL VARIABLES
require('dotenv').config();

const {
    DISCORD_TOKEN
} = process.env;
const {
    prefix
} = require('./config/config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // console.log(message.content);

    const args = message.content.slice(prefix.length).split(/ +/); // make sure to split correctly even with multiple spaces
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        console.log('Command', commandName, 'not found');
        return;
    }

    const command = client.commands.get(commandName);


    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }


    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(DISCORD_TOKEN);