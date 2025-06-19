const { GiveawaysManager: gw } = require('discord-giveaways');
const giveawayModel = require('../Models/giveaway');
 
module.exports = class GiveawaysManager extends gw {
    async getAllGiveaways() {
        return await giveawayModel.find().lean();
    }
 
    async saveGiveaway(messageId, giveawayData) {
        return await giveawayModel.create(giveawayData);
    }
 
    async editGiveaway(messageId, giveawayData) {
        return await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true });
    }
 
    async deleteGiveaway(messageId) {
        return await giveawayModel.deleteOne({ messageId });
    }
};