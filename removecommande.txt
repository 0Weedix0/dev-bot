const { REST, Routes, Client, GatewayIntentBits } = require('discord.js')
const fs = require('fs')
const { token } = require('./config.json')
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ] }) 

const rest = new REST({ version: '10' }).setToken(token);
const clientID = '1125816918192947262'
// client.handleCommands = async() => {

  const commandFolder = fs.readdirSync('./Commands')
  for (const folder of commandFolder){
      const commandFile = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'))

      const {commands, commandArray} = client
      for (const file of commandFile){
          const command = require(`../../../Commands/${folder}/${file}`)
          commands.set(command.data.name, command)
          commandArray.push(command.data.toJSON())
      }
  }    


try {
      console.log('Started refreshing application (/) commands.');
  
      rest.put(
        Routes.applicationCommands(clientID),
        { body: client.commandArray }, // Un tableau vide pour supprimer toutes les commandes
      );
  
      console.log('Successfully removed all application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  
// const fs = require("node:fs");
// const path = require("node:path");
// const { REST } = require("@discordjs/rest");
// const { Routes } = require("discord.js");
// const {  token } = require("./config.json");


// const rest = new REST({ version: '10' }).setToken(token);
 
//     try {
//       console.log('Started refreshing application (/) commands.');
  
//       rest.put(
//         Routes.applicationCommands(clientID),
//         { body: [] }, // Un tableau vide pour supprimer toutes les commandes
//       );
  
//       console.log('Successfully removed all application (/) commands.');
//     } catch (error) {
//       console.error(error);
//     }