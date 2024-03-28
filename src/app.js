const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes, Client, Collection } = require('discord.js');
const ErrorMessenger = require('../modules/tools/errReport');
const {mainGuildId ,botToken, clientId, intents} = require(`../data/config.js`).ref;
const client = new Client({ intents });
const em = new ErrorMessenger("app.js");
client.commands = new Collection();
const commands = [];
const foldersPath = path.join(__dirname, '../modules/commands');
const commandFolders = fs.readdirSync(foldersPath);

try {

	for(const commandFile of commandFolders) {
		const commandPath = path.join(foldersPath, commandFile);
		const command = require(commandPath)

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
		}
	}

	const eventsPath = path.join(__dirname, '../modules/events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}

	const rest = new REST().setToken(botToken);

	(async () => {
		try {
			rest.put(Routes.applicationCommands(clientId), { body: [] })
				.then(() => console.log(`\x1b[38;5;228m Started refreshing ${commands.length} application (/) commands.\x1b[0m`))
				.catch(console.error);

			const data = rest.put(
				Routes.applicationGuildCommands(clientId, mainGuildId),
				{ body: commands },
			);

			console.log(`\x1b[38;5;228m Successfully reloaded ${data.length} application (/) commands.\x1b[0m`);
		} catch (error) {
			em.report(error)
		}
	})();

	client.login(botToken).then(() => {
		console.log(`\b\x1b[38;5;83m Authorization was successful!\x1b[0m`);
	});

} catch (error) {
	em.report(error)
}