import type { Hours, OpeningWords } from './restaurant';

function toMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	return hours * 60 + minutes;
}

function blockFor(day: number, hours: Hours[]): Hours | undefined {
	return hours.find((block) => block.days.includes(day));
}

/** The one line for the hero: open today until when, or when the doors open next. */
export function openingHeadline(now: Date, hours: Hours[], words: OpeningWords): string {
	const day = now.getDay();
	const minutes = now.getHours() * 60 + now.getMinutes();
	const today = blockFor(day, hours);

	if (today && minutes < toMinutes(today.closes)) {
		return `${words.today} ${today.opens} – ${today.closes}`;
	}

	for (let offset = 1; offset <= 7; offset++) {
		const nextDay = (day + offset) % 7;
		const next = blockFor(nextDay, hours);
		if (next) {
			const prefix = today ? words.closedForToday : words.closedToday;
			return `${prefix}, ${words.dayNames[nextDay]} ${words.from} ${next.opens}`;
		}
	}

	return words.closed;
}
