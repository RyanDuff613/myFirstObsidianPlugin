import { Notice, Plugin } from 'obsidian';

export default class myFirstPlugin extends Plugin {
	async onload() {
		new Notice("myFirstPlugin loaded!");
		this.addRibbonIcon("eye","myFirstPlugin notice trigger",() => {
			new Notice("Hello from myFirstPlugin");
		})
	}

	onunload() {
		console.log("MyFirstPlugin has unloaded.");
	}
}



