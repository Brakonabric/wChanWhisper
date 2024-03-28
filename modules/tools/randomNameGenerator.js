const jsonClient = require('./serverClient');
const crypto = require('crypto');
class RandomNameGenerator {
	constructor() {
		this.server = new jsonClient('');
		this.titlePart = null
	}
	async getData(){
		this.titlePart = await this.server.read('/channelTitles')
	}
	genRandomInt(max) {
		const randomBytes = crypto.randomBytes(1);
		const randomValue = randomBytes.readUInt8(0);
		return randomValue % max;
	}

	async genFirst() {
		const firstName = this.titlePart[0].content;
		const firstRand = this.genRandomInt(firstName.length);
		return firstName[firstRand];
	}

	async genSecond() {
		const secondName = this.titlePart[1].content;
		const secondRand = this.genRandomInt(secondName.length);
		return secondName[secondRand];
	}

	async genEmoji() {
		const emoji = this.titlePart[2].content;
		const randEmoji = this.genRandomInt(emoji.length);
		return emoji[randEmoji];
	}

	async getName() {
		await this.getData()
		const emoji = await this.genEmoji();
		const firstPart = await this.genFirst();
		const secondPart = await this.genSecond();
		return `${emoji}-${firstPart}-${secondPart}-${emoji}`;
	}
}
module.exports = RandomNameGenerator;