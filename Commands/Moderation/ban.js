const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban un membre')
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('cible que vous voulez ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('raison')
                .setDescription('raison du ban')
                .setRequired(true)
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('cible')
        const reason = interaction.options.getString('raison')
        const member = await interaction.guild.members.fetch(user.id);


        const banEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('ban')
            .setDescription(`ban ${user.username}for ${reason}`)

        await interaction.reply({ embeds: [banEmbed] })
        await member.ban({ reason: reason })
    }

}