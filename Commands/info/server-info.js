const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('optien les info du serveur')
        .setDMPermission(false),

    async execute(interaction, client) {
        const { guild } = interaction

        const { createdTimestamp, ownerId, memberCount, emojis, stickers, channels, roles } = guild
        const icon = guild.iconURL()
        const totEmoji = 'none' || emojis.cache.map(e => e.toString())
        const totRole = 'none' || roles.cache.map(e => e.toString())

        const serverInfoEmbed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                name: `${guild.name} info`,
                iconURL: icon
            })
            .setThumbnail(icon)
            .addFields(
                { name: `**Nom du Serveur**`, value: guild.name, inline: true },
                { name: `**ID du Serveur**`, value: guild.id, inline: true },
                { name: `**Proprietaire**`, value: `<@${ownerId}>`, inline: true },
                { name: `**Serveur crée le**`, value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline: true },
                { name: `**Membre dans le Serveur**`, value: `${memberCount}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `**Boost du Serveur**`, value: `${guild.premuimSubscriptionCount}`, inline: true },
                { name: `**Niveaux de Boost**`, value: `${guild.premiumTier}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `**Sticker du Serveur**`, value: `${'0' || stickers.cache.size}`, inline: true },
                { name: `**Emojis du Server:**`, value: `${'0' || emojis.cache.size}\nAnimated: ${'0' || emojis.cache.filter(emoji => emoji.animated).size}\nNormal: ${'0' || emojis.cache.filter(emoji => !emoji.animated).size}`, inline: true },
                { name: `**Emojis**`, value: `${totEmoji}`, inline: true },
                { name: `**Roles du Serveur**`, value: `${roles.cache.size - 1}`, inline: true },
                { name: `**Roles**`, value: `${totRole}`, inline: true },
                { name: `**Roles le plus Haut**`, value: `${roles.highest}`, inline: true },
                { name: `**Server Stats:**`, value: `Total: ${channels.cache.size}\n${channels.cache.filter(channel => channel.type === ChannelType.GuildText).size} ⌨️\n${channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size} 🔈\n${channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size} 📢\n${channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size} 📁` },)

            .setFooter({
                text: guild.name,
                iconURl: icon
            })
        await interaction.deferReply({ fetchReply: true })
        await interaction.editReply({ embeds: [serverInfoEmbed] })
    }





}

