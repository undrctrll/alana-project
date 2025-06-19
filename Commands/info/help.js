const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of all the commands form the discord bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    async execute(interaction) {

        const { client, user } = interaction;

        const helpcommandEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.avatarURL()})
        .setColor("#00ffff")
        .setImage('https://cdn.discordapp.com/attachments/1377649129613951067/1384930029288558592/standard.gif?ex=68543819&is=6852e699&hm=41eb98c35752e004ddc5c067dcbb43ffd4098c2192e60f4190a36b014788988c&')
        .setDescription(`Halo ${user}! Berikut adalah daftar command yang tersedia. Untuk info lebih lanjut, gunakan "/help [command]"`)
        .addFields(
          { name: '🛡️ Moderation', value: '`clear`, `setup-welcome`, `ban`, `unban`, `kick`, `mute`, `unmute`, `createverify`, `embed-builder`, `send-changelogs`, `dm`', inline: false },
          { name: '🎉 Giveaway', value: '`giveaway-start`, `giveaway-edit`, `giveaway-end`, `giveaway-reroll`', inline: false },
          { name: '🎵 Music', value: '`play`, `pause`, `queue`, `resume`, `skip`, `stop`, `volume`, `forward`, `loop`, `nowplaying`, `rewind`, `shuffle`', inline: false },
          { name: '💸 Economy', value: '`economy-deposit`, `economy-withdraw`, `economy-create`, `economy-delete`, `economy-balance`', inline: false },
          { name: '😂 Fun', value: '`8ball`, `avatar`, `coin-flip`, `confess`, `hug`, `kiss`, `quotes`, `slap`, `tweet`', inline: false },
          { name: 'ℹ️ Information', value: '`botinfo`, `help`, `memberinfo`, `serverinfo`, `report-bug`, `ping`, `changelogs`', inline: false },
          { name: '🔗 Links', value: '[Support Server](https://discord.gg/AJsMAPQnrR) 🔹 [Donation](https://discord.gg/AJsMAPQnrR)', inline: false },
        )
        .setFooter({ text: `💖 Terima kasih sudah menggunakan ${client.user.username}! 💖` })

      interaction.reply({ embeds: [helpcommandEmbed] });
    },
};