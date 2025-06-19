const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Untuk melihat tentang bot dan pemilik bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    async execute(interaction) {

        const { client, user } = interaction;

        const aboutmeEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.avatarURL()})
        .setColor("#00ffff")
        .setImage('https://cdn.discordapp.com/attachments/1377649129613951067/1384930029288558592/standard.gif?ex=68543819&is=6852e699&hm=41eb98c35752e004ddc5c067dcbb43ffd4098c2192e60f4190a36b014788988c&')
        .setDescription(`**Alana** is a multiple functional bot that developed by **Natz** from **WARGA +62** server. This bot is created since 10th June 2023. This bot have many rich commands such as Stable Music, Global Economy, Leveling, Fun, Reaction, and lots more!\n❯ **Main Developer**\n\`[•]\`**[Natz](https://github.com/venusally)**`)
        .setFooter({ text: `💖💖💖` })
        .addFields(
          { name: 'Links', value: `[Support Server](https://discord.gg/AJsMAPQnrR) 🔹 [Donation](https://discord.gg/AJsMAPQnrR)`, inline: true },
        )

      interaction.reply({ embeds: [aboutmeEmbed] });
    },
};