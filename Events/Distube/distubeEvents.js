const client = require("../../index.js");
const { EmbedBuilder } = require("discord.js");

// Map untuk menyimpan timer disconnect
const disconnectTimers = new Map();

// Fungsi untuk mendapatkan status queue
function status(queue) {
    return `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``;
}

client.distube
    .on('playSong', (queue, song) => {
        // Hapus timer disconnect jika ada lagu baru dimainkan
        if (disconnectTimers.has(queue.id)) {
            clearTimeout(disconnectTimers.get(queue.id));
            disconnectTimers.delete(queue.id);
        }
        
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setFooter({ text: '©️ 2023 Alana Music System'})
                .setDescription(`**・Started Playing**\n↳ \`${song.name}\` - \`[${song.formattedDuration}]\``)]
            }
        )
    })
    .on('addSong', (queue, song) => {
        // Reset timer disconnect jika ada lagu baru ditambahkan
        if (disconnectTimers.has(queue.id)) {
            clearTimeout(disconnectTimers.get(queue.id));
            disconnectTimers.delete(queue.id);
        }
        
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]
            }
        )
    })
    .on('addList', (queue, playlist) => {
        // Reset timer disconnect jika ada playlist ditambahkan
        if (disconnectTimers.has(queue.id)) {
            clearTimeout(disconnectTimers.get(queue.id));
            disconnectTimers.delete(queue.id);
        }
        
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length
                        } songs) to queue\n${status(queue)}`)]
            }
        )
    })
    .on('error', (channel, e) => {
        if (channel) channel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setDescription('Something went wrong. Please try again later.')]
        })
        else console.error(e)
    })
    .on('empty', channel => {
        channel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setDescription('Voice channel is empty, leaving the channel.')]
        });
        
        // Langsung disconnect jika channel kosong dengan guild ID yang aman
        try {
            const queue = client.distube.getQueue(channel.guild.id);
            if (queue) {
                queue.stop();
            }
        } catch (error) {
            console.log('Queue already disconnected or guild not found');
        }
    })
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription('`No result found for \`${query}\`!`')]
            })
    )
    .on('finish', queue => {
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setDescription('Queue finished! Bot will disconnect in 5 minutes if no new songs are added.')]
        });
        
        // Simpan guild ID untuk referensi yang aman
        const guildId = queue.guild.id;
        
        // Set timer untuk disconnect setelah 5 menit
        const disconnectTimer = setTimeout(() => {
            if (disconnectTimers.has(queue.id)) {
                disconnectTimers.delete(queue.id);
            }
            
            // Cek apakah masih ada queue yang aktif dengan guild ID yang aman
            try {
                const currentQueue = client.distube.getQueue(guildId);
                if (currentQueue && currentQueue.songs.length === 0) {
                    queue.textChannel.send({
                        embeds: [new EmbedBuilder().setColor("Yellow")
                            .setDescription('⏰ No activity detected for 5 minutes. Disconnecting from voice channel.')]
                    });
                    currentQueue.stop();
                }
            } catch (error) {
                console.log('Queue already disconnected or guild not found');
            }
        }, 5 * 60 * 1000); // 5 menit dalam milidetik
        
        disconnectTimers.set(queue.id, disconnectTimer);
    })
    .on('disconnect', queue => {
        // Hapus timer jika bot disconnect
        if (disconnectTimers.has(queue.id)) {
            clearTimeout(disconnectTimers.get(queue.id));
            disconnectTimers.delete(queue.id);
        }
        
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setDescription('Disconnected from voice channel.')]
        });
    });