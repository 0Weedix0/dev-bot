// const { REST, Routes, Client } = require('discord.js')
// const fs = require('fs')
// const { token } = require('./config.json')


// const rest = new REST({ version: '10' }).setToken(token);
const clientID = '1125816918192947262'
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
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const {  token } = require("./config.json");


const rest = new REST({ version: '10' }).setToken(token);
 
    try {
      console.log('Started refreshing application (/) commands.');
  
      rest.put(
        Routes.applicationCommands(clientID),
        { body: [] }, // Un tableau vide pour supprimer toutes les commandes
      );
  
      console.log('Successfully removed all application (/) commands.');
    } catch (error) {
      console.error(error);
    }