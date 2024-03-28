class IgnoreMember {
	static ignoreState = {
		id: [],
		state: false,
	}
	constructor(user) {
		this.user = user;
	}

	async setState() {
		IgnoreMember.ignoreState.state = true;
		console.log("setIgnore")
		await new Promise(resolve => setTimeout(resolve, 180000));
		IgnoreMember.ignoreState.state = false;

	}

	getState(){
		return IgnoreMember.ignoreState.state;
	}

	async setMember() {
		IgnoreMember.ignoreState.id.push(this.user);
		await new Promise(resolve => setTimeout(resolve, 300000));
		this.resolveMember(this.user);
	}

	getMember() {
		return IgnoreMember.ignoreState.id.includes(this.user);
	}

	resolveMember(user){
		const resolve = IgnoreMember.ignoreState.id.indexOf(user);
		IgnoreMember.ignoreState.id.splice(resolve, 1);
	}
}

module.exports = IgnoreMember;