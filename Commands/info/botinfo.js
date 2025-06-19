const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const os = require("os")
const packageJson = require('../../package.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Menampilkan informasi lengkap tentang bot ini."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const uptime = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`
        const botUser = client.user
        const botCreated = `<t:${Math.floor(botUser.createdTimestamp / 1000)}:F>`
        const totalChannels = client.channels.cache.size
        const totalGuilds = client.guilds.cache.size
        const totalUsers = client.users.cache.size
        const nodeVersion = process.version
        const djsVersion = packageJson.dependencies["discord.js"] || "-"
        const memoryUsage = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        const cpuUsage = `${(os.loadavg()[0] * 100).toFixed(2)}%`
        const osInfo = `${os.type()} ${os.release()} ${os.arch()}`
        const supportLink = "https://discord.gg/AJsMAPQnrR"
        const prefix = "/ (Slash Command)"
        const developer = "UNDR CTRL"
        const botVersion = packageJson.version || "1.0.0"
        const description = packageJson.description || "Bot Discord multi-fungsi."

        const embed = new EmbedBuilder()
            .setTitle(`🤖 Informasi Bot - ${botUser.username}`)
            .setThumbnail(botUser.displayAvatarURL({ extension: "png", size: 512 }))
            .setColor("Aqua")
            .setDescription(description)
            .addFields(
                { name: "👤 Developer", value: developer, inline: true },
                { name: "🆔 ID Bot", value: botUser.id, inline: true },
                { name: "📅 Dibuat", value: botCreated, inline: true },
                { name: "📦 Versi Bot", value: botVersion, inline: true },
                { name: "💻 Bahasa & Library", value: `Node.js ${nodeVersion}\ndiscord.js ${djsVersion.replace('^','')}`, inline: true },
                { name: "🖥️ Sistem Operasi", value: osInfo, inline: true },
                { name: "🟢 Uptime", value: uptime, inline: true },
                { name: "📶 Ping", value: `${Math.round(client.ws.ping)} ms`, inline: true },
                { name: "💾 Memory", value: memoryUsage, inline: true },
                { name: "🧮 CPU", value: cpuUsage, inline: true },
                { name: "🌐 Server", value: `${totalGuilds} server`, inline: true },
                { name: "👥 Pengguna", value: `${totalUsers} user`, inline: true },
                { name: "#️⃣ Channel", value: `${totalChannels} channel`, inline: true },
                { name: "🔑 Prefix", value: prefix, inline: true },
                { name: "🔗 Support", value: `[Klik di sini](${supportLink})`, inline: true },
            )
            .setFooter({ text: `Terima kasih telah menggunakan ${botUser.username}!`, iconURL: botUser.displayAvatarURL({ extension: "png" }) })

        await interaction.reply({ embeds: [embed], ephemeral: false })
    }
}