const { REST, Routes } = require('discord.js')
const fs = require('fs')
const { token } = require('../../../config.json')

module.exports = (client) => {
    client.handleCommands = async() => {

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
        
        const clientID = '1125816918192947262'
        const guildID = '1136618532055035924'
        const rest = new REST({version: '10'}).setToken(token)

        // try {
        //     console.log('Started refreshing application (/) commands.');
        
        //     rest.put(
        //       Routes.applicationCommands(clientID),
        //       { body: [] }, // Un tableau vide pour supprimer toutes les commandes
        //     );
        
        //     console.log('Successfully removed all application (/) commands.');
        //   } catch (error) {
        //     console.error(error);
        //   }
        try{
            console.log('reloading commands')
            
            await rest.put(
                Routes.applicationCommands(clientID),
                {body: client.commandArray}
            )

            console.log('reload fait')
        }catch(error){
            console.error(error)
        }
    }
}