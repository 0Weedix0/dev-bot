const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const ms = require('ms')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('ban un membre')
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('cible que vous voulez ban temporairement')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('temps')
                .setDescription('temps de ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('raison')
                .setDescription('raison du ban temporaire')
                .setRequired(false)
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('cible')
        const temps = interaction.options.getString('temps')
        const reason = interaction.options.getString('raison') ?? 'sans raison'
        const member = await interaction.guild.members.fetch(user.id);


        const banEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('temp ban')
            .setDescription(`ban temporaire de ${user.username} pour ${reason} pendant ${temps}`)

        await interaction.reply({ embeds: [banEmbed] })
        await member.ban({ reason: reason })

        setTimeout(async () => {
            const unbanEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('unban de ')
                .setDescription(`${user.username} il a ete banni ${temps} pour ${reason}`)

            await interaction.channel.send({ embeds: [unbanEmbed] })
                await interaction.guild.members.unban(user)
                console.log(`unban de ${user.username}`)
        },ms(temps))

    }

}