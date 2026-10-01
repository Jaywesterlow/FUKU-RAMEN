import { openingHeadline } from '$lib/data/opening';
import { openingHours, type OpeningWords } from '$lib/data/restaurant';

/**
 * The clock the site reads. `now` stays null on the server and until the first effect runs,
 * so the prerendered HTML and the first client render agree; after that it ticks once a minute.
 */
class Opening {
	now = $state<Date | null>(null);

	/** Day of the week, or null while the clock has not started. */
	day = $derived(this.now ? this.now.getDay() : null);

	/** The hero line in the page's language. Reactive where it is read, since it reads `now`. */
	headline(words: OpeningWords): string {
		return this.now ? openingHeadline(this.now, openingHours, words) : words.fallback;
	}

	isToday(days: number[]): boolean {
		return this.day !== null && days.includes(this.day);
	}

	/** Call from an effect; returns its own cleanup. */
	start(): () => void {
		this.now = new Date();
		const timer = setInterval(() => (this.now = new Date()), 60_000);
		return () => clearInterval(timer);
	}
}

export const opening = new Opening();
