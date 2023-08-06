const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { token } = require('./config.json')
const fs = require('fs')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] }) 
client.commands = new Collection()
client.commandArray = []


const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith('.js'))
    for (const file of functionFiles) require(`./src/functions/${folder}/${file}`)(client)
}
client.handleCommands()
client.handleEvents()
client.login(token)
