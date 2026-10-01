import type { Copy } from './restaurant';

/** English, the default at `/`. Facts (address, times, prices, photos) live in `restaurant.ts`. */
export const en: Copy = {
	lang: 'en',
	tagline: 'Ramen redefined.',
	description:
		'Ramen redefined. A seasonal tasting menu around house-made ramen, local ingredients and sake in Amsterdam Oost. Izakaya à la carte on Saturday.',
	area: 'Amsterdam Oost',
	phoneHours: 'Phone Wednesday to Saturday, 11:00 – 18:00',
	hours: [
		{ label: 'Wednesday to Friday', note: 'the evening, reservations only' },
		{ label: 'Saturday', note: 'izakaya, walk-ins limited' }
	],
	closedLabel: 'Sunday to Tuesday',
	opening: {
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		today: 'Today',
		closedForToday: 'Closed for today',
		closedToday: 'Closed today',
		from: 'from',
		closed: 'Closed',
		fallback: 'Wednesday to Saturday'
	},
	navLinks: ['Fortune', 'The evening', 'Saturday', 'Visit'],
	courses: [
		{ title: 'To begin', line: 'Small bites and a first pour.' },
		{ title: 'Raw', line: 'Fish and vegetables at their moment.' },
		{ title: 'From the charcoal', line: 'Straight from the fire to the counter.' },
		{ title: "The season's plate", line: 'Whatever is at its best this month.' },
		{ title: 'The bowl', line: 'House-made ramen, as the main course.' },
		{ title: 'To finish', line: 'Something sweet, and a last sake.' }
	],
	ways: [
		{
			title: 'The evening',
			line: 'Six courses, ramen as the main.',
			detail: '€89 · reservations only',
			alt: 'A course on a stone plate'
		},
		{
			title: 'The izakaya',
			line: 'À la carte, a weekly ramen special.',
			detail: 'Limited walk-ins',
			alt: 'Skewers over the charcoal grill'
		}
	],
	evening: {
		priceNote: 'per person · reservations only',
		note: 'A sample structure. The menu follows the season.'
	},
	saturdayFacts: [
		{ term: 'Reservations', detail: 'Recommended. Limited walk-ins.' },
		{ term: 'Company', detail: 'Children and dogs welcome.' },
		{ term: 'Veg & vegan', detail: 'Always available on Saturday.' }
	],
	goodToKnow: [
		'Reservations open on the 1st of each month at 12:00, two months ahead.',
		'A €10 deposit per person holds your table. Free changes up to 24 hours before.',
		'Online for up to 5 guests. Larger groups by email.',
		'The evening is for guests of 13 and up. Please skip the perfume.',
		'Pescatarian and no-pork are possible. Vegetarian and vegan on Saturday.'
	],
	strip: [
		'The counter and bar, lit low',
		'A bottle of sake',
		'A table by the wall with a single flower',
		'A cocktail with an orange peel',
		'Noodles lifted from a bowl',
		'Shoyu ramen with egg and chashu',
		'Grilled fish on a green sauce'
	],
	ui: {
		nav: { label: 'Main', reserve: 'Reserve', menu: 'Menu', close: 'Close', language: 'Language' },
		hero: {
			lines: ['Ramen', 'redefined.'],
			lede: 'Six seasonal courses that end in a bowl.',
			reserve: 'Reserve a table',
			more: 'The evening',
			cue: 'Scroll',
			cueLabel: 'Scroll down'
		},
		fortune: {
			vertical: 'fuku · fortune',
			eyebrow: 'Fortune',
			lines: ['Fuku means fortune.', 'Here it comes in a bowl.'],
			lede: 'House-made ramen, local ingredients, sake. A seasonal tasting menu through the week, the izakaya on Saturday.',
			alt: 'The chef at the counter, preparing a course',
			caption: 'The counter'
		},
		ways: { eyebrow: 'Two ways to eat here', lines: ['An evening, or a Saturday.'] },
		evening: {
			eyebrow: 'The evening · Wednesday to Friday',
			lines: ['Six courses.', 'One bowl at the end.'],
			sample: 'Sample evening',
			course: 'Course',
			reserve: 'Reserve the evening'
		},
		saturday: {
			eyebrow: 'Saturday · 13:00 – 19:30',
			lines: ['The izakaya.'],
			lede: 'À la carte from one in the afternoon. A ramen special that changes every week, plates to share, sake.',
			video: 'Noodles lifted from a bowl of ramen',
			reserve: 'Reserve a Saturday'
		},
		strip: { label: 'Photos of Fuku Ramen' },
		visit: {
			eyebrow: 'Visit & reserve',
			lines: ['Come and eat.'],
			hours: 'Hours',
			today: 'Today',
			closed: 'Closed',
			find: 'Find us',
			good: 'Good to know',
			reserve: 'Reserve a table',
			waitlist:
				'Fully booked? The waiting list in the booking system emails you when a table frees up.'
		},
		footer: { reserve: 'Reserve', top: 'Back to top', credit: 'Concept demo · jwcreative.nl' }
	}
};
