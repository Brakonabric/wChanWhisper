const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ErrorMessenger = require('../tools/errReport');
const jsonClient = require('../tools/serverClient');
const em = new ErrorMessenger("voiceStateUpdate.js");
class NameGenerator{
constructor(firstName,secondName) {
this.firstName = firstName.replace(" ", "-").toLowerCase();
this.secondName = secondName.replace(" ", "-").toLowerCase();
}

async addNames() {
	try {
		const server = new jsonClient('/channelTitles');
		const firstNameArr = await server.read('/firstName', 'content');
		const secondNameArr = await server.read('/secondName', 'content');
		firstNameArr.push(this.firstName)
		secondNameArr.push(this.secondName)
		await server.update('/firstName', {
			'content': firstNameArr,
		})
		await server.update('/secondName', {
			'content': secondNameArr,
		})
	} catch (error) {
		em.report(error);
	}
}
 }

 module.exports = {
 	data: new SlashCommandBuilder()
 		.setName(`am`)
 		.setDescription(`Add the name to the global list`)
 		.addStringOption(option =>
 			option.setName('firstname').setDescription('Enter the first name')
 		).addStringOption(option =>
 			option.setName('secondname').setDescription('Enter the second name'))
 		.setDefaultMemberPermissions(PermissionFlagsBits.Connect),
	async execute(interaction) {
 		try {
 			let firstName = interaction.options.getString('firstname');
 			let secondName = interaction.options.getString('secondname')
 			const server = new NameGenerator(firstName, secondName)
 			await server.addNames()
		} catch (error) {
			em.report(error);
 		}
 		interaction.reply({
 			content:'Спасибо за ваш вклад',
 			ephemeral: true
		}).then(msg => {
			setTimeout(() => msg.delete(), 2000)
 		})
 	},
 };