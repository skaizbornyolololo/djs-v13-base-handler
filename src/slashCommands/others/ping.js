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

module.exports = new Slash({
	name: "ping",
	description: "Xem độ trễ của bot",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(client, interaction, args) {
		const embed = new MessageEmbed();

		embed
			.setTitle(":ping_pong: Pong!")
			.setDescription("Độ trễ: `" + `${client.ws.ping}` + "ms`")
			.setColor(MAIN_COLOR)

        await interaction.deferReply().catch(e => { })
		await interaction.followUp({embeds: [embed]});
	}
});