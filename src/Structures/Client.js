/** @format */

const Discord = require("discord.js");

const Command = require("./Command.js");

const Slash = require("./Slash.js")

const config = require("../Data/config.json");

const Event = require("./Event.js");

const intents = new Discord.Intents(32767);

const fs = require("fs");
class Client extends Discord.Client {
	constructor() {
		super({ intents });
		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();
		/**
		 * @type {Discord.Collection<string, Slash>}
		 */
		this.slashCommands = new Discord.Collection();
		this.prefix = config.prefix;
	}

	start(token) {
		fs.readdirSync("./src/Commands")
			.forEach(dir => {
				fs.readdirSync(`./src/Commands/${dir}`)
					.filter(file => file.endsWith(".js"))
					.forEach(file => {
						/**
						 * @type {Command}
						 */
						const command = require(`../Commands/${dir}/${file}`);
						console.log(`Command ${command.name} loaded`);
						this.commands.set(command.name, command);
					})
			});

		let slashArr = []

		const slsCommandFiles = fs.readdirSync("./src/slashCommands")
		slsCommandFiles.forEach(dir => {
			fs.readdirSync(`./src/slashCommands/${dir}`)
				.filter(file => file.endsWith(".js"))
				.forEach(file => {
					/**
					 * @type {Slash}
					 */
					const slashCmd = require(`../slashCommands/${dir}/${file}`)
					console.log(`Slash Command ${slashCmd.name} loaded`)
					this.slashCommands.set(slashCmd.name, slashCmd)
					slashArr.push(slashCmd)
				})
		})

		const slashCommands = slashArr.map(
			/**
			 * @param {Slash} cmd 
			 * @returns 
			 */
			cmd => ({
			name: cmd.name.toLowerCase(),
			description: cmd.description,
			permissions: [],
			options: cmd.slashCommandOptions,
			defaultPermission: true
		}));
		

		this.on("ready", async () => {
            // use this when u wanna use slashcommands only on ur server
			// const cmds = await this.guilds.cache.get("ur server id");
			// await cmds.commands.set(slashCommands)

			const cmds = await this.application.commands.set(slashCommands)
			cmds.forEach(cmd => console.log(`✅ | Slash Command ${cmd.name} registered`));
		})
			
		fs.readdirSync("./src/Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`)
				console.log(`Event ${event.event} loaded`)
				this.on(event.event, event.run.bind(null, this))
			});

		this.login(token);
	}
}

module.exports = Client;