const { SlashCommandBuilder } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName(`debug`)
		.setDescription(`Send message content to console.`)
		.addStringOption(option =>
		option.setName('input').setDescription('Content to be displayed in the console')
		),
	async execute(interaction) {
		let data = interaction.options.getString(`input`)
		console.log(data)
		interaction.reply({
			content:'Вау, что это внутри...',
			ephemeral: true
		}).then(msg => {
			setTimeout(() => msg.delete(), 10000)
		})
	},
};