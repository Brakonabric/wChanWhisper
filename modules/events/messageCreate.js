const { Events } = require('discord.js');
const { apiSwitch } = require('../../data/AI/aihandler');
const { clientId } = require('../../data/config').ref;
const IgnoreMember = require('../tools/ignoreMember')
const crypto = require('crypto');
const jsonClient = require('../../modules/tools/serverClient');
const ErrorMessenger = require('../tools/errReport');
const server = new jsonClient('/gptReplay')
const em = new ErrorMessenger("messageCreate.js");
class MessageHandler {
	constructor(msg) {
		this.msg = msg;
		this.tag = `<@${clientId}>`;
		this.user = msg.author.id;
		this.text = msg.content;
	}

	emptyMsg() {
		return this.text.replace(this.tag, '').replace(' ', '').length === 0;
	}

	msgWithoutMention() {
		return `"${this.text.replace(this.tag, '')}"`;
	}

	avoidLoop() {
		return this.user === clientId;
	}

	async handleBotMention() {
		const ignoreMember = new IgnoreMember(this.user);
		const botMention = this.msg?.mentions.users?.has(clientId);
		if (this.avoidLoop() || ignoreMember.getState()) return;
		if (botMention && !ignoreMember.getMember()) {
			//Ignore target user
			if (Math.random() < 0.05) {
				await this.msg.reply('надоел ты мне <:Grrrrr:938169200231452702>');
				await ignoreMember.setMember();
				return;
			}

			//Ignore all users
			if (Math.random() < 0.01) {
				await this.msg.reply('скоро вернусь... <:animehmph:1105612035779203093>');
				await ignoreMember.setState();
				return;
			}

			//Null msg reply
			if (this.emptyMsg()) {
				let randomReaction = crypto.randomInt(1, 11);
				let onEmpty = await server.read('/onEmpty', 'content');
				let answer = await onEmpty[randomReaction];
				await this.msg.reply(answer);
				return;
			}

			console.time('GPT');
			try {
				const aiResponse = await apiSwitch(this.msgWithoutMention());
				await this.msg.reply(aiResponse);
			} catch (error) {
				em.report(error)
			}
			console.timeEnd('GPT');
			return;
		}

		//Emoji react
		if (Math.random() < 0.15) {
			await this.msg.react(`<:bot:1176684894676594698>`);
		}

	}
}

module.exports = {
	name: Events.MessageCreate,
	execute: async (msg) => {
		const messageHandler = new MessageHandler(msg);
		await messageHandler.handleBotMention();
	},
};
