const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, VoiceChannel, GuildEmoji, EmbedBuilder} = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Set volume a song")
    .addIntegerOption(option =>
            option.setName("volume")
                .setDescription("10 = 10%")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
    ),
    async execute(interaction) {
        const { member, guild, options } = interaction;
        const volume = options.getInteger('volume');
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if(!voiceChannel) {
            embed.setColor("Red").setDescription("You must be in a voice channel to execute these commands");
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        if(guild.members.me.voice.channelId && member.voice.channelId !== guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`You cant use the player because it is active in another channel in <#${guild.members.me.voice.channelId}> `);
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        try {

            client.distube.setVolume(voiceChannel, volume);
            return interaction.reply({content: `🔊 Volume has been set to ${volume}%`})
                
        } catch(err) {
            console.error("Distube error:", err);
            embed.setColor("Red").setDescription(`⛔| Something went wrong`);
            return interaction.reply({embeds: [embed], ephemeral: true})
        }   
    }
}