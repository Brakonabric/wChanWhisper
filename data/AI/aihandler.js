const axios= require('axios');
require('dotenv').config({path: '.env'})
const jsonClient = require('../../modules/tools/serverClient');
const server = new jsonClient('/gptReplay')
const crypto = require('crypto');
const ErrorMessenger = require('../../modules/tools/errReport');
const em = new ErrorMessenger("aiHandler.js");
async function apiSwitch(text) {

	const prefix = await server.read('/prefix', 'content')

	function getOption(i, j) {
		const api = {
			url: [process.env.APILINK1, process.env.APILINK2],
			key: [process.env.GPTAPIKEY1, process.env.GPTAPIKEY2, process.env.GPTAPIKEY3],
			host: ["chatgpt-api8.p.rapidapi.com", "open-ai25.p.rapidapi.com"],
			data: [[
				{
					content: 'Hello! I\'m an AI assistant bot based on ChatGPT 3. How may I help you?',
					role: 'system'
				},
				{
					content: `${prefix} ${text}`,
					role: 'user'
				}
			],
				{
					query: `${prefix} ${text}`
				}
			],
		}
		return {
			method: 'POST',
			url: api.url[i],
			headers: {
				'content-type': 'application/json',
				'X-RapidAPI-Key': api.key[j],
				'X-RapidAPI-Host': api.host[i],
			},
			data: api.data[i]
		}
	}

	for(let i = 0; i <= 1; i++){
		for(let j =0; j <= 2; j++){
			console.log(`\b\t\x1b[38;5;11m[ API response:` + i + ` | User host:` + j + ` ]\x1b[0m`)
			try {
				let config = getOption(i , j)
				const response = await axios.request(config);
				console.log(`\t\x1b[38;5;2m[ SUCCESS ]\x1b[0m`)
				if(i === 0) {
					return response.data.text
				} else {
					return response.data.response
				}
			} catch (error) {
				console.log(`\t\x1b[38;5;1m[ FAILED ]\x1b[0m`)
				em.report(error)
			}
		}
	}
	const skipRandom = crypto.randomInt(1, 51);
	const skipArray = await server.read('/skip', 'content');
	return await skipArray[skipRandom];
}

module.exports = {
	apiSwitch
}