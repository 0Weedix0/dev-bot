const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping commande'),
    async execute(interaction, client){
        const message = await interaction.deferReply({fetchReply: true})
        const pingmsg = `API latency: ${client.ws.ping}\nclient ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply(pingmsg)
    }
}