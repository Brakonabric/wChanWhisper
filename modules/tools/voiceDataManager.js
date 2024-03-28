const jsonClient = require('./serverClient');

class VoiceDataManager extends jsonClient {
	constructor() {
		super('/voiceChannelList');
		this.channel = null;
		this.member = null;
	}

	overrideObjectTemplate() {
		return {
			id: this.channel,
			members: [],
			edited: Date()
		};
	}

	async parse(channel, members) {
		this.channel = channel;
		this.member = members;
	}


	async createChannelObject() {
		if (!await this.find(this.channel)) {
		const newChannelObject = this.overrideObjectTemplate();
		await this.create(newChannelObject);
		}
	}

	async editChannelObject(state) {
		let voiceContent = this.data.data[0]//await this.read(`/${this.channel}`);
		switch (state) {
		case 'join' : {
			voiceContent["members"] = await this.addMember(voiceContent["members"])
			await this.update(this.channel, voiceContent)
			return;
		}
		case 'leave': {
			voiceContent["members"] = await this.removeMember(voiceContent["members"])
			const membersCount = voiceContent["members"].length
			if (membersCount === 0) {
				await this.delete(`/${this.channel}`)
				return "channel empty"
			} else {
				await this.update(this.channel, voiceContent)
				return;
			}
		}
		default:
			console.log('server db state is undefined');
			return;
		}
	}

	async addMember(members) {
		members.push(this.member)
		return members
	}

	async removeMember(members) {
		return members.filter(id => id !== this.member)
	}
}

module.exports = VoiceDataManager;