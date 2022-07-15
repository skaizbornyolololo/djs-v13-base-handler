/** @format */

const Event = require("../Structures/Event.js");

module.exports = new Event("ready", client => {
    console.log("Bot is ready!");
    setInterval(() => {
        let users = client.users.cache.size
        let guilds = client.guilds.cache.size
        let activities = [
        `@(ur bot name) | ${guilds} servers!`,
        `write anything here`,
    ];
        const status = activities[Math.floor(Math.random()*activities.length)];
        client.user.setPresence({
        status: "online",
        activities: [{
            name: `${status}`,
            type: "PLAYING",
        }]
    })
    }, 60000)
});