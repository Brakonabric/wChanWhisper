const { Events, ChannelType } = require('discord.js');
const RandomNameGenerator = require('../tools/randomNameGenerator.js')
const ErrorMessenger = require('../tools/errReport');
const VoiceDataManager = require('../tools/voiceDataManager');
const em = new ErrorMessenger("voiceStateUpdate.js");
const { hubChannel,hubCategory } = require('../../data/config').ref;
class VoiceHandler {
	constructor(oldState, newState) {
		this.oldMember = oldState.member.user.id;
		this.newMember = newState.member.user.id;
		this.oldState = oldState;
		this.newState = newState;
		this.oldVoiceChannelId = oldState.channelId;
		this.newVoiceChannelId = newState.channelId;
		this.hubChannel = hubChannel;
		this.hubCategory = hubCategory;
		this.state = [oldState.channel?.parentId, newState.channel?.parentId];
	}

	async createVoiceChannel() {
		try {
			const createdChannel = await this.newState.channel.parent.children
				.create({
					name: `${await this.generateNaming()}`,
					type: ChannelType[`GuildVoice`],
			})
			return createdChannel.id;
		} catch (error) {
			em.report(error)
		}
	}

	moveUser(channel) {
		this.newState.member.voice.setChannel(channel).then(r => {console.log(r.displayName+" was moved!")});
	}

	closeVoiceChannel(channelID) {
		const voiceToDelete = this.oldState.guild.channels.cache.get(channelID);
		voiceToDelete.delete();
	}

	generateNaming() {
		const generator = new RandomNameGenerator;
		return generator.getName();
	}

	async onEvent() {
		if (this.oldVoiceChannelId === this.newVoiceChannelId) {
			return;
		}
		if (this.state.includes(this.hubCategory)) {
			const voiceData = new VoiceDataManager();
			if (this.newVoiceChannelId === this.hubChannel) {
				const newChannel = await this.createVoiceChannel();
				await voiceData.parse(newChannel, this.newMember);
				await voiceData.createChannelObject()
				this.moveUser(newChannel);
			}
			if ((this.oldVoiceChannelId || this.newVoiceChannelId) === '1205614619431931934') {
				return;
			}
			if(this.oldVoiceChannelId !== this.hubChannel){
				if (await voiceData.find(this.oldVoiceChannelId)) {
					await voiceData.parse(this.oldVoiceChannelId, this.oldMember);
					if(await voiceData.editChannelObject('leave') === "channel empty"){
						this.closeVoiceChannel(this.oldVoiceChannelId)
					}
					console.log('leave on ' + new Date(Date.now()).toLocaleTimeString());
					return;
				}
			}
			if(this.newVoiceChannelId !== this.hubChannel){
				if (await voiceData.find(this.newVoiceChannelId)) {
					await voiceData.parse(this.newVoiceChannelId, this.newMember);
					await voiceData.editChannelObject('join');
					console.log('join on ' + new Date(Date.now()).toLocaleTimeString());
				}
			}
		}
	}
}

module.exports = {
	name: Events.VoiceStateUpdate,
	execute: async (oldState, newState) => {
		const voiceHandler = new VoiceHandler(oldState, newState);
		await voiceHandler.onEvent();
	},
};
