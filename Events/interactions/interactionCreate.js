const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const roleId = "1379444972859822080";
      const role = interaction.guild.roles.cache.get(roleId);

      if (!role) {
        return interaction.reply({
          content: `Role dengan ID ${roleId} tidak ditemukan di server ini.`,
          ephemeral: true,
        });
      }

      return interaction.member.roles.add(roleId).then((member) =>
        interaction.reply({
          content: `<@&${roleId}> has been assigned to you.`,
          ephemeral: true,
        })
      ).catch(err => {
        interaction.reply({
          content: `Gagal menambahkan role: ${err.message}`,
          ephemeral: true,
        });
      });
    } else {
      return;
    }
  },
};
