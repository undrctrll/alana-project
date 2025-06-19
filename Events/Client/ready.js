const {Client, ActivityType} = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            await mongoose.connect(process.env.MONGO_DB || '', {
                // Opsi yang didukung di MongoDB driver terbaru
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            console.log('MongoDB connection successful.');
        } catch (error) {
            console.error('MongoDB connection failed:', error.message);
        }

        client.user.setPresence({ activities: [{ name: 'Ramadhan Kareem 🌙', type: ActivityType.Playing }], status: 'idle' });

        console.log(client.user.username + ' is now online.');
    },
};