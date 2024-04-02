

# 🌿 wChanWhisper 🌿 

wChanWhisper is a non-commercial project representing a Discord bot developed in JavaScript using the Node.js runtime environment. The bot was created with the primary goal of enhancing user interaction on the channel by providing various moderation and entertainment features. It allows for scaling the number of voice channels, provides various chat moderation commands, and includes a built-in AI assistant that simulates the behavior of a regular channel moderator, making it even more attractive to users.

## 🔧 Installation and Setup 🔧

   #### 1. Clone the repository to your computer:
   
   ```
   gh repo clone Brakonabric/wChan
   ```
   
   #### 2. Install dependencies:
   
   ```
   npm run setup
   ```
   
   #### 3. Run the bot:
   
   In development mode using [Nodemon](https://www.npmjs.com/package/nodemon):
   
   ```
   npm run start
   ```
   
   In code debugging mode:
   
   ```
   npm run debug
   ```
   
   In 24/7 online mode using [PM2](https://pm2.keymetrics.io/):
   
   ```
   npm run build
   ```


After successful startup, the bot will run in the background and automatically restart in case of errors or crashes. To stop the bot, use:

```
npm run stop
```


## ⭐️ Project Features ⭐️

+ **Modular Structure:**
   - The project is organized using a modular structure for easy expansion and maintenance.
   - Files are categorized into modules such as `tools`, `events`, `commands`, and `data`, facilitating navigation and finding necessary components.


+ **Utilization of Discord API:**
   - [Discord.js](https://discord.js.org/) library is used for interacting with the Discord API.
   - The bot subscribes to various events using [Discord Gateway Intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents), such as messages, server members, and changes in voice channel states.
   - Bot commands are implemented through [Discord Slash Commands](https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files), allowing users to interact with the bot in a convenient and intuitive way.


+ **Bots Functional Capabilities:**
   - The project provides various functions such as:
      - `/purge` Deleting messages from text channels.
      - Automatic creation of voice channels when joining a previously established voice channel as a "hub", and their subsequent deletion after being emptied.
        ![img.gif](https://i.imgur.com/7B51ElO.gif)
      - `/am` Adds a name to the global list stored on your Json server for generating a random name for a new voice channel.
   - To enhance the user experience, the bot reacts to various events such as mentions in messages, changes in voice channel states, and others.


+ **Configuration:**
   - All configuration data, such as tokens, identifiers, and settings, are stored in the `data/config.js` file.
   - Data such as tokens are loaded through environment variables using the `dotenv` library.
   - Template `.env` file with descriptions of necessary data [here](https://github.com/Brakonabric/wChanWhisper/blob/main/data/DOTENV.md).


+ **Error Handling:**
   - The project contains functionality for error handling and sending notifications about them in the form of messages in Discord.
   - This helps to promptly respond to possible issues without monitoring the console and ensure stable bot operation.


+ **Flexibility and Extensibility:**
   - Thanks to the modular structure of the project, adding new functionality or extending existing one becomes simple and convenient.
   - Using principles of object-oriented programming simplifies code maintenance and scalability.


+ **Utilization of NoSQL Database:**
   - A NoSQL database in the form of Json Server is used to store necessary information about channels and user ratings.
   - Detailed information and structure of the database [here]().


+ **Chat Interaction Features:**
   - Using language models, the bot provides a unique pattern of behavior and simulates a fictional chat participant. The bot can respond to users when addressed in a text channel, simulating a fictional chat participant with its own character and individual behavior.
   ![img.gif](https://i.imgur.com/HfyiL3M.gif)
   - The bot may selectively ignore chat participants for an indefinite period if they mention it in the chat.
   ![img.gif](https://i.imgur.com/YzpOcP6.gif)
   - The bot may randomly leave the chat for an indefinite period when attempting to address it.
   ![img.gif](https://i.imgur.com/IHvbbeZ.gif)

## ⚙️ Environment Requirements ⚙️

- [Node.js](https://nodejs.org/en/download) v20.11.0 and above.
- Access to Discord API [(token and client ID)](https://discord.com/developers/applications).
- Token for ChatGPT, for example, from [RapidAPI](https://rapidapi.com/).
- Json Server or another NoSQL database.

## 📝 License 📝

This project is licensed under the [Apache License 2.0](https://raw.githubusercontent.com/Brakonabric/wChanWhisper/main/LICENSE).

