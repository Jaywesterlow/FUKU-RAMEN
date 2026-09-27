import type { PhotoKey } from '$lib/assets/photos';

/**
 * One content object. The page, the "open today" line and the JSON-LD all read from here,
 * so opening hours on screen and in structured data can never drift apart.
 */

export type OpeningBlock = {
	/** 0 = Sunday … 6 = Saturday, as Date.getDay() returns them */
	days: number[];
	schemaDays: string[];
	label: string;
	opens: string;
	closes: string;
	note: string;
};

export type Restaurant = typeof restaurant;

export const restaurant = {
	name: 'Fuku Ramen',
	tagline: 'Ramen redefined.',
	description:
		'Ramen redefined. A seasonal tasting menu around house-made ramen, local ingredients and sake in Amsterdam Oost. Izakaya à la carte on Saturday.',
	url: 'https://www.fukuramenamsterdam.com/',
	reserveUrl: 'https://www.fukuramenamsterdam.com/',
	email: 'hello@fukuramenamsterdam.com',
	phone: {
		display: '+31 6 42 60 85 96',
		href: 'tel:+31642608596',
		schema: '+31642608596',
		hours: 'Phone Wednesday to Saturday, 11:00 – 18:00'
	},
	address: {
		street: 'Ingogostraat 14A',
		postalCode: '1092 HZ',
		city: 'Amsterdam',
		country: 'NL',
		area: 'Amsterdam Oost',
		maps: 'https://maps.google.com/?q=Ingogostraat+14A,+1092+HZ+Amsterdam'
	},
	instagram: 'https://www.instagram.com/fuku_ramen_amsterdam',
	kvk: '86228811',
	priceRange: '€€€',
	cuisine: ['Ramen', 'Japanese'],
	hours: [
		{
			days: [3, 4, 5],
			schemaDays: ['Wednesday', 'Thursday', 'Friday'],
			label: 'Wednesday to Friday',
			opens: '18:00',
			closes: '23:00',
			note: 'the evening, reservations only'
		},
		{
			days: [6],
			schemaDays: ['Saturday'],
			label: 'Saturday',
			opens: '13:00',
			closes: '19:30',
			note: 'izakaya, walk-ins limited'
		}
	] satisfies OpeningBlock[],
	closedLabel: 'Sunday to Tuesday'
};

export type Course = {
	id: number;
	kanji: string;
	title: string;
	line: string;
	photo: PhotoKey;
};

/** A sample structure: the real menu follows the season. */
export const courses: Course[] = [
	{ id: 1, kanji: '一', title: 'To begin', line: 'Small bites and a first pour.', photo: 'p06' },
	{ id: 2, kanji: '二', title: 'Raw', line: 'Fish and vegetables at their moment.', photo: 'p08' },
	{
		id: 3,
		kanji: '三',
		title: 'From the charcoal',
		line: 'Straight from the fire to the counter.',
		photo: 'p10'
	},
	{
		id: 4,
		kanji: '四',
		title: "The season's plate",
		line: 'Whatever is at its best this month.',
		photo: 'p11'
	},
	{
		id: 5,
		kanji: '五',
		title: 'The bowl',
		line: 'House-made ramen, as the main course.',
		photo: 'p04'
	},
	{
		id: 6,
		kanji: '六',
		title: 'To finish',
		line: 'Something sweet, and a last sake.',
		photo: 'p12'
	}
];

export type Way = {
	href: string;
	title: string;
	days: string;
	hours: string;
	line: string;
	detail: string;
	photo: PhotoKey;
	alt: string;
};

export const ways: Way[] = [
	{
		href: '#evening',
		title: 'The evening',
		days: 'Wednesday to Friday',
		hours: '18:00 – 23:00',
		line: 'Six courses, ramen as the main.',
		detail: '€89 · reservations only',
		photo: 'p08',
		alt: 'A course on a stone plate'
	},
	{
		href: '#saturday',
		title: 'The izakaya',
		days: 'Saturday',
		hours: '13:00 – 19:30',
		line: 'À la carte, a weekly ramen special.',
		detail: 'Limited walk-ins',
		photo: 'p10',
		alt: 'Skewers over the charcoal grill'
	}
];

export const evening = {
	price: '€89',
	priceNote: 'per person · reservations only',
	note: 'A sample structure. The menu follows the season.'
};

export const saturdayFacts = [
	{ term: 'Reservations', detail: 'Recommended. Limited walk-ins.' },
	{ term: 'Company', detail: 'Children and dogs welcome.' },
	{ term: 'Veg & vegan', detail: 'Always available on Saturday.' }
];

export const goodToKnow = [
	'Reservations open on the 1st of each month at 12:00, two months ahead.',
	'A €10 deposit per person holds your table. Free changes up to 24 hours before.',
	'Online for up to 5 guests. Larger groups by email.',
	'The evening is for guests of 13 and up. Please skip the perfume.',
	'Pescatarian and no-pork are possible. Vegetarian and vegan on Saturday.'
];

export type StripPhoto = { photo: PhotoKey; alt: string; wide: boolean };

export const strip: StripPhoto[] = [
	{ photo: 'p03', alt: 'The counter and bar, lit low', wide: true },
	{ photo: 'p09', alt: 'A bottle of sake', wide: false },
	{ photo: 'p07', alt: 'A table by the wall with a single flower', wide: true },
	{ photo: 'p12', alt: 'A cocktail with an orange peel', wide: false },
	{ photo: 'p04', alt: 'Noodles lifted from a bowl', wide: true },
	{ photo: 'p02', alt: 'Shoyu ramen with egg and chashu', wide: false },
	{ photo: 'p11', alt: 'Grilled fish on a green sauce', wide: true }
];

export const navLinks = [
	{ href: '#story', label: 'Fortune' },
	{ href: '#evening', label: 'The evening' },
	{ href: '#saturday', label: 'Saturday' },
	{ href: '#visit', label: 'Visit' }
];
