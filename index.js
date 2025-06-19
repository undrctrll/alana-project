const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const GiveawaysManager = require("./Utils/giveaway");
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const {Guilds, GuildMembers, GuildMessages, GuildVoiceStates, GuildMessageReactions} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;
require('dotenv').config()

const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify')

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates, GuildMessageReactions],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()],
    ffmpegPath: ffmpeg,
    nsfw: false,
    emptyCooldown: 30,
    savePreviousSongs: true,
    searchSongs: 0,
    searchCooldown: 30,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
});

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
});

client.giveawayManager = new GiveawaysManager(client, {
    default: {
      botsCanWin: false,
      embedColor: "#a200ff",
      embedColorEnd: "#550485",
      reaction: "🎉",
    },
});

module.exports = client;