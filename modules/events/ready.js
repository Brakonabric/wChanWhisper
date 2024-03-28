const { Events, ActivityType } = require('discord.js');
class Activity {
	static watch () {
		let timeDifference = new Date() - new Date('2024-02-03');
		return {
			activities: [{
				name: `One Piece S1.E${(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))}`,
				type: ActivityType['Watching'],
			}],
			status: 'dnd', //dnd, idle, online,
		}
	}
}
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.user.setPresence(Activity.watch());
	},
};
