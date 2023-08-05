const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unban un membre')
        .addStringOption(option =>
            option
                .setName('userid')
                .setDescription('user id que vous voulez unban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('raison')
                .setDescription('raison du unban')
                .setRequired(false)
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction, client) {
        const user = interaction.options.getString('userid')
        const reason = interaction.options.getString('raison') ?? 'pas de raison'
       
        try {const unbanEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Unban')
            .setDescription(`unban ${user} for ${reason}`)

        await interaction.reply({ embeds: [unbanEmbed] })
        await interaction.guild.members.unban(user)
    }catch (err) {const errorunbanEmbed = new EmbedBuilder()
        .setColor('Random')
    .setTitle('Unban error')
    .setDescription(`entrée un id valide`)
    await interaction.reply({ embeds: [errorunbanEmbed] })
    console.log(err)

    }
        
}

}