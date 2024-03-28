const { GatewayIntentBits } = require('discord.js');
require('dotenv').config({path: 'data/.env'})
const ref = {
	/**
	 *	This is an access token for discord application bot.
	 *
	 *  See https://discord.com/developers/applications/
	 */
	botToken: process.env.DSTOKEN,
	/**
	 *	This is an application client id.
	 *
	 * 	This value is equal to application id.
	 *
	 * 	See https://discord.com/developers/applications/
	 */
	clientId: process.env.CLIENT_ID,
	/**
	 * Debug channel id to avoid spam.
	 */
	debugChannelId: process.env.DEBUGCHANNEL,
	/**
	 * Main guild id. BCTOWER.
	 */
	mainGuildId: process.env.MAINGUILD,
	/**
	 * Client intents for successful work.
	 */
	intents: [
		GatewayIntentBits['Guilds'],
		GatewayIntentBits['GuildMembers'],
		GatewayIntentBits['GuildMessages'],
		GatewayIntentBits['MessageContent'],
		GatewayIntentBits['GuildMessageReactions'],
		GatewayIntentBits['GuildVoiceStates']
	],
	/**
	 * Current IP and port where the Json Server is hosted, for example http://192.168.x.x:3000/.
	 */
	serverIp: process.env.SERVERIP,
	/**
	 The id of the voice channel that is selected as the hub for channel creation.
	 */
	hubChannel: process.env.LOCALHUB,
	/**
	 * The category ID of the category in which the hub channel is located
	 */
	hubCategory: process.env.HUBCATEGORY,
	/**
	 * Link to the created webhook for submitting errors
	 */
	errWebHookUrl: process.env.ERRORWEBHOOKURL
}
module.exports = {
	ref
};