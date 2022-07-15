const Event = require("../Structures/Event.js");

module.exports = new Event("interactionCreate", async (client, interaction) => {
    if (!interaction.isCommand()) return;

    // const args = [
    //     interaction.commandName,
    //     ...client.slashCommands
    //         .find(cmd => cmd.name.toLowerCase() == interaction.commandName)
    //         .slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`)
    // ]

    const args = [];

    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) args.push(option.value);
    }

    const command = client.slashCommands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

    if (!command) return interaction.reply("That is not a valid command!");

    const permission = interaction.member.permissions.has(command.permission);

    if (!permission)
        return interaction.reply({ content: "Bạn không có quyền để chạy lệnh này!", ephemeral: true});

    command.run(client, interaction, args);
});