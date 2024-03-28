const { Events } = require('discord.js');
const ErrorMessenger = require('../tools/errReport');
const em = new ErrorMessenger("interactionCreate.js");
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		try {
			await command.execute(interaction);
		} catch (error) {
			em.report(error)
		}
	},
};
