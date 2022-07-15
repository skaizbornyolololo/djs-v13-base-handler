/** @format */

const Client = require("./Client.js");

const Discord = require("discord.js");

const SlashCommandBuilder = require("@discordjs/builders")

/**
 * @param {Client} client
 * @param {Discord.CommandInteraction} interaction
 * @param {string[]} args
 */
function RunFunction(client, interaction, args) {}

class Slash {
	/**
	 * @typedef {{name: string, description: string, slashCommandOptions: Discord.ApplicationCommandOption[], permission: Discord.PermissionString, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
        this.slashCommandOptions = options.slashCommandOptions || [];
		this.permission = options.permission;
		this.run = options.run;
	}
}

module.exports = Slash;