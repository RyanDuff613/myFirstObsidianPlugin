import { Notice, Plugin } from 'obsidian';

export default class myFirstPlugin extends Plugin {
	async onload() {
		this.addRibbonIcon("cog","myFirstPlugin notice trigger",() => {
			new Notice("Hello from myFirstPlugin");
		})
		
	}

	onunload() {
		console.log("MyFirstPlugin has unloaded.");
	}
}



