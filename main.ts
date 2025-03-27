import { Notice, Plugin, TFile } from 'obsidian';

export default class myFirstPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "insert-random-quote",
			name: "Insert Random Quote",
			callback: async () => {
				await this.insertRandomQuote();
			},
		});
	}

	async insertRandomQuote() {
		const quotes = await this.getAllQuotes();
		if (quotes.length === 0) {
			new Notice("No quotes found in vault.");
			return;
		}

		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		await this.insertQuoteIntoDailyNote(randomQuote);
	}

	async getAllQuotes() {
		const files = this.app.vault.getMarkdownFiles();
		const quotes = [];

		for (const file of files) {
			const content = await this.app.vault.read(file);
			const matches = [...content.matchAll(/^>\s*["“](.+?)["”]\s*\n\s*\\-\s*(.+)$/gm)];
			if (matches) {
				for (const match of matches) {
						const fullQuote = `"${match[1]}"\n- ${match[2]}`;
						quotes.push(fullQuote.trim());
				}
			}
		}
		console.log(quotes);
		return quotes;
	}

	async insertQuoteIntoDailyNote(quote: string) {
		const today = window.moment().format("YYYY-MM-DD");
		const dailyNotePath = `Daily Notes/${today}.md`;
		let dailyNote = this.app.vault.getAbstractFileByPath(dailyNotePath);

		if (!dailyNote) {
			dailyNote = await this.app.vault.create(dailyNotePath, `# ${today}\n\n`);
		}

		if (dailyNote instanceof TFile) {
			const content = await this.app.vault.read(dailyNote);
			await this.app.vault.modify(dailyNote, `${content}\n> ${quote}`);
			new Notice("Quote added to today's note.");
		}
	}

	onunload() {
		console.log("MyFirstPlugin has unloaded.");
	}
}



