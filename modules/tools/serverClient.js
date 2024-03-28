const axios = require('axios');
const { serverIp } = require('../../data/config').ref;
const ErrorMessenger = require('./errReport');
const em = new ErrorMessenger("serverClient.js");
class jsonClient {
	constructor(path) {
		this.server = serverIp;
		this.path = path;
		this.localPath = this.server + this.path
		this.data = null;
	}


	//find id
	async find(directory) {
		if(directory === null) return false
		try {
			const res = await axios.get(`${this.localPath}?id=${directory}`);
			this.data = res
			return res.data.length !== 0;
		} catch (error) {
			em.report(error)
			return false
		}
	}

	async delete(directory) {
		await axios.delete(this.localPath+directory)
	}

	async update(directory, data) {
		await axios.put(`${this.localPath}/${directory}`, data)
		//не заменяет обьет :/
	}
	//add object
	async create(data) {
		try {
			await axios.post(this.localPath, data)
		} catch (error) {
			em.report(error);
		}
	}

	//get object
	async read(directory, data) {
		try {
			const res = await axios.get(this.localPath+directory);
			if (data !== undefined) {
				return res.data[data];
			}
			return res.data;

		} catch (error) {
			em.report(error)
			throw error; // Rethrow the error to be caught by the caller
		}
	}
}

module.exports = jsonClient;