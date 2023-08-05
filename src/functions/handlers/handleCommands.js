const { REST, Routes } = require('discord.js')
const fs = require('fs')
const { token } = require('../../../config.json')

module.exports = (client) => {
    client.handleCommands = async () => {

        const commandFolder = fs.readdirSync('./Commands')
        for (const folder of commandFolder) {
            const commandFile = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'))

            const { commands, commandArray } = client
            for (const file of commandFile) {
                const command = require(`../../../Commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
                console.log(`${file}`)
            }
        }

        const clientID = '1125816918192947262'
        const rest = new REST({ version: '10' }).setToken(token)

        try {
            console.log(`Started Refreshing Commands`)

         rest.put(
                Routes.applicationCommands(clientID), // This Will Work For Multi Guild(Server)
                { body: client.commandArray },
            )
            console.log(`Successfully Refreshed Commands`)
        } catch (error) {
            console.error(error)
        }
    }
}