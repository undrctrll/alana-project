const { GuildMember, InteractionCollector } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        try {
            const data = await Schema.findOne({ Guild: member.guild.id });
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const { user, guild } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
                .setTitle("**Welcome new member!**")
                .setDescription(data.Msg)
                .setColor(0x037821)
                .addFields({ name: 'Total members', value: `${guild.memberCount}` })
                .setImage('https://cdn.discordapp.com/attachments/1049664952878772294/1097509426543480923/giphy.gif')
                .setTimestamp();

            welcomeChannel.send({ embeds: [welcomeEmbed] });
            member.roles.add(data.Role);
        } catch (err) {
            console.error('Error in guildMemberAdd:', err);
        }
    }
}