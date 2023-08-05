const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick un membre')
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('cible que vous voulez kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('raison')
                .setDescription('raison du kick')
                .setRequired(true)
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getUser('cible')
        const reason = interaction.options.getString('raison')
        const member = await interaction.guild.members.fetch(user.id);


        const kickEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('kick')
            .setDescription(`kick ${user.username} for ${reason}`)

        await interaction.reply({ embeds: [kickEmbed] })
        await member.kick({ reason: reason })
    }
}