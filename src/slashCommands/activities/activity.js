/** @format */

const { 
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
	MessageButton
 } = require("discord.js");
const Slash = require("../../Structures/Slash.js")
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const { DiscordTogether } = require('discord-together');

module.exports = new Slash({
	name: "activity",
	description: "Chơi game trên Discord!",
	slashCommandOptions: [
        {
            name: "activities",
            type: 3,
            description: "Chọn hoạt động",
            required: true,
            choices: [
                {
                    name: "betrayal",
                    nameLocalized: "betrayal",
                    value: "betrayal"
                },
                {
                    name: "chess",
                    nameLocalized: "chess",
                    value: "chess"
                },
                {
                    name: "doodlecrew",
                    nameLocalized: "doodlecrew",
                    value: "doodlecrew"
                },
                {
                    name: "fishing",
                    nameLocalized: "fishing",
                    value: "fishing"
                },
                {
                    name: "poker",
                    nameLocalized: "poker",
                    value: "poker"
                },
                {
                    name: "youtube",
                    nameLocalized: "youtube",
                    value: "youtube"
                },
                {
                    name: "wordsnack",
                    nameLocalized: "wordsnack",
                    value: "wordsnack"
                }
            ]
        },
    ],
	permission: "SEND_MESSAGES",
	async run(client, interaction, args) {
        client.discordTogether = new DiscordTogether(client);

		const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            await interaction.reply({ content: "**:x: | Bạn đang không ở trong kênh thoại!**", ephemeral: true }).catch(err => {console.log(err)})
            return
        }

        const clientvoiceChannel = interaction.guild.me.voice.channel
        if (clientvoiceChannel) {
            if (voiceChannel !== clientvoiceChannel) {
                await interaction.reply({ content: "**:x: | Bạn phải ở cùng kênh thoại với bot!**", ephemeral: true }).catch(err => {console.log(err)})
                return
            }
        }

        const acti = interaction.options.getString("activities")
        
        client.discordTogether.createTogetherCode(voiceChannel.id, acti).then(async invite => {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(`${acti.toUpperCase()}`)
                        .setStyle("LINK")
                        .setURL(invite.code)
                )
            await interaction.reply({ content: "**Click bên dưới để bắt đầu chơi!**", components: [row]}).catch(err => {console.log(err)})
        });
	}
});