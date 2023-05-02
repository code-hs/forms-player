export class Storage {
	static getFullKey(key: string): string {
		return `WDFL:${key}`;
	}

	static save(key: string, data: unknown): void {
		localStorage.setItem(this.getFullKey(key), JSON.stringify(data));
	}

	static get(key: string): unknown | null {
		const data = localStorage.getItem(this.getFullKey(key));
		if (!data) return null;

		return JSON.parse(data);
	}
}
