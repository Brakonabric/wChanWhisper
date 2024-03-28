const axios = require('axios');
const { errWebHookUrl } = require('../../data/config').ref;
class ErrorMessenger {
	constructor(source) {
		this.url = errWebHookUrl;
		this.source = source;
	}

	report (errorData) {
		console.log(errorData)
		const exampleEmbed = {
			color: 0xc97016,
			title: '** :warning: ВНИМАНИЕ СБОЙ :warning: **',
			description: '<@289077705209544706> произошла ошибка...',
			fields: [
				{
					name: '**Имя ошибки:**',
					value: "```" + errorData.name + "```",
				},
				{
					name: '**Код ошибки:**',
					value: "```" + errorData.code + "```",
				},
				{
					name: '**Сообщение об ошибке:**',
					value: "```" + errorData.message + "```",
				},
				{
					name: '**Стек вызовов:**',
					value: "```" + errorData.stack + "```",
				}
			],
			timestamp: new Date().toISOString(),
			footer: {
				text: this.source,
			},
		};

	// 	axios.post(this.url, {
	// 		//content: '<@981524205751390288> spam',
	// 		embeds: [exampleEmbed] })
	// 		.catch(error => console.error('Error sending notification to Discord:', error.message));
	}
}

module.exports = ErrorMessenger;