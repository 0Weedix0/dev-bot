const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('optien les info du membre')
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('cible que vous voulez espioner')
                .setRequired(false)
        )

        .setDMPermission(false),

    async execute(interaction, client) {
        const member = interaction.options.getMember('user') || interaction.member
        const userinfoEmbed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                name: `${member.user.username}info`,
                iconURL: member.user.displayAvatarURL()
            })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: `**User Name**`, value: `${member.user.username}#${member.user.discriminator}`, inline: true },
                { name: `**User ID**`, value: member.user.id, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `**Discord created at:**`, value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: `**joined serveur :**`, value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: `**Roles**`, value: `${member.roles.cache.map(role => role.toString())}` }
            )
            .setFooter({ text: `${member.user.username}info` })

        await interaction.deferReply({ fetchReply: true })
        await interaction.editReply({embeds: [userinfoEmbed]})
    }


}