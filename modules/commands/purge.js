const { SlashCommandBuilder } = require('discord.js');
const jsonClient = require('../tools/serverClient');
const ErrorMessenger = require('../tools/errReport');
const em = new ErrorMessenger('purge.js');
class embedProgress {
	constructor(iterMax) {
		this.iterMax = iterMax;
		this.bar = '🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥';
		this.i = 0
	}

	barProgress(iter) {
		const progress = Math.round((iter / this.iterMax) * 10);
		switch (progress) {
		case 1:
			this.bar = '🟩🟥🟥🟥🟥🟥🟥🟥🟥🟥';
			break;
		case 2:
			this.bar = '🟩🟩🟥🟥🟥🟥🟥🟥🟥🟥';
			break;
		case 3:
			this.bar = '🟩🟩🟩🟥🟥🟥🟥🟥🟥🟥';
			break;
		case 4:
			this.bar = '🟩🟩🟩🟩🟥🟥🟥🟥🟥🟥';
			break;
		case 5:
			this.bar = '🟩🟩🟩🟩🟩🟥🟥🟥🟥🟥';
			break;
		case 6:
			this.bar = '🟩🟩🟩🟩🟩🟩🟥🟥🟥🟥';
			break;
		case 7:
			this.bar = '🟩🟩🟩🟩🟩🟩🟩🟥🟥🟥';
			break;
		case 8:
			this.bar = '🟩🟩🟩🟩🟩🟩🟩🟩🟥🟥';
			break;
		case 9:
			this.bar = '🟩🟩🟩🟩🟩🟩🟩🟩🟩🟥';
			break;
		case 10:
			this.bar = '🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩';
			break;
		default:
			this.bar = '🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥';
			break;
		}
		return this.bar;
	}
	getIter(){
		return this.i;
	}
	setIter(){
		this.i++;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`purge`)
		.setNameLocalizations({
			ru: 'приберись'
		})
		.setDescription(`Maybe she'll clean up your room if you ask nicely.`)
		.setDescriptionLocalizations({
			ru: 'Может быть, она уберет в твоей комнате, если ты вежливо попросишь.'
		})
		.addNumberOption(option =>
			option
				.setName('count')
				.setNameLocalizations({
					ru: 'кол-во'
				})
				.setDescription('How many messages need to be deleted.')
				.setDescriptionLocalizations({
					ru: 'Кол-во сообщений, которые нужно удалить.'
				})
		),
	async execute(interaction) {
		const server = new jsonClient('/commands')
		const state = await server.read('/purge', 'cool-down')

		try {
			if(!state) {
				let input = interaction.options.getNumber('count');
				let count = input < 100 ? input : 100;
				if(count <= 0 || !Number.isInteger(count)) {
					interaction.reply({
						content: 'Ты дурак? <:ouch:917501984825831485>',
						ephemeral: true,
					})
					return;
				}
				await server.update('/purge', { 'cool-down': true })
				interaction.channel.messages.fetch({ limit: count }).then(async messages => {
					interaction.reply({
						embeds: [{
							//title: "LOL",
							description: '🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥',
							footer: {
								text: `Очищено сообщений 0/0`,
							},
						}],
					}).then(msg => {
						let iMax = messages.size;
						const bar = new embedProgress(iMax);
						const messagesIterator = messages.values();

						const processNextMessage = () => {
							const nextMessage = messagesIterator.next().value;
							if (nextMessage) {
								msg.edit({
									embeds: [{
										//title: "LOL",
										description: bar.barProgress(bar.getIter()),
										footer: {
											text: `Очищено сообщений ${bar.getIter()}/${iMax}`,
										},
									}]
								});

								nextMessage.delete().then(async () => {
									bar.setIter();
									if (iMax === bar.getIter()) {
										msg.edit({
											embeds: [{
												//title: `LOL`,
												description: bar.barProgress(iMax),
												footer: {
													text: `Очищено сообщений ${bar.getIter()}/${iMax}`,
												},
											}]
										});
										setTimeout(() => msg.delete(), 5000);
										await server.update('/purge', { 'cool-down': false })
									}
									processNextMessage();
								});
							}
						};

						processNextMessage();
					});
				});
			} else {
				await interaction.reply({
					content: 'Не видишь? Я занята <:ouch:917501984825831485>',
					ephemeral: true,
				})
			}
		} catch (error) {
			em.report(error);
			await interaction.reply({
				content: '<:ouch:917501984825831485>',
				ephemeral: true,
			})
		}
	},
};