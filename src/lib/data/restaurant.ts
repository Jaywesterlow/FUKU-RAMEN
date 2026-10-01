import type { PhotoKey } from '$lib/assets/photos';
import { en } from './restaurant.en';
import { nl } from './restaurant.nl';

/**
 * The content of the site. Facts that read the same in every language live here once;
 * the words live in `restaurant.en.ts` and `restaurant.nl.ts`. `content[locale]` joins them,
 * so the page, the "open today" line and the JSON-LD can never drift apart between languages.
 */

export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];

/** `/` is English, `/nl` is Dutch. Anything else falls back to English. */
export function localeFrom(param: string | undefined): Locale {
	return param === 'nl' ? 'nl' : 'en';
}

export const site = {
	origin: 'https://fuku-ramen.vercel.app',
	paths: { en: '/', nl: '/nl' } satisfies Record<Locale, string>,
	languages: {
		en: { code: 'EN', name: 'English' },
		nl: { code: 'NL', name: 'Nederlands' }
	} satisfies Record<Locale, { code: string; name: string }>
};

export type Hours = {
	/** 0 = Sunday … 6 = Saturday, as Date.getDay() returns them */
	days: number[];
	schemaDays: string[];
	opens: string;
	closes: string;
};

export type OpeningBlock = Hours & { label: string; note: string };

/** Language-neutral facts: the same on every page and in the JSON-LD. */
export const facts = {
	name: 'Fuku Ramen',
	url: 'https://www.fukuramenamsterdam.com/',
	/**
	 * Booking runs on Tebi (checked on fukuramenamsterdam.com, 1 October 2026; it was Zenchef before).
	 * The snippet below is the one Fuku's own site loads. Tebi's manager script turns the token
	 * into the widget iframe; `widgetUrl` is what that iframe showed on their site, for reference.
	 * `url` is the plain link: without JavaScript, or if the widget fails, Reserve goes there.
	 */
	reservations: {
		provider: 'Tebi',
		url: 'https://www.fukuramenamsterdam.com/reservations',
		origin: 'https://live.tebi.co',
		script: 'https://live.tebi.co/ecom/widget-manager.js',
		widgetToken: '431923_26ad8730388e1eed93775c4571c4335e45d8a533b2ec9d21f8c5f573af38f30d',
		widgetUrl:
			'https://live.tebi.co/ecom/widget/431923_d57b9f4c740c29a76d64c253e773200cb35c386a348f508874876abf312560e2'
	},
	email: 'hello@fukuramenamsterdam.com',
	phone: {
		display: '+31 6 42 60 85 96',
		href: 'tel:+31642608596',
		schema: '+31642608596'
	},
	address: {
		street: 'Ingogostraat 14A',
		postalCode: '1092 HZ',
		city: 'Amsterdam',
		country: 'NL',
		maps: 'https://maps.google.com/?q=Ingogostraat+14A,+1092+HZ+Amsterdam'
	},
	instagram: 'https://www.instagram.com/fuku_ramen_amsterdam',
	kvk: '86228811',
	priceRange: '€€€',
	cuisine: ['Ramen', 'Japanese'],
	price: '€89'
};

export type Facts = typeof facts;

const hours: [Hours, Hours] = [
	{
		days: [3, 4, 5],
		schemaDays: ['Wednesday', 'Thursday', 'Friday'],
		opens: '18:00',
		closes: '23:00'
	},
	{ days: [6], schemaDays: ['Saturday'], opens: '13:00', closes: '19:30' }
];

/** The clock reads these; they hold no words. */
export const openingHours: Hours[] = hours;

/** A sample structure: the real menu follows the season. */
const courseFacts = [
	{ id: 1, kanji: '一', photo: 'p06' },
	{ id: 2, kanji: '二', photo: 'p08' },
	{ id: 3, kanji: '三', photo: 'p10' },
	{ id: 4, kanji: '四', photo: 'p11' },
	{ id: 5, kanji: '五', photo: 'p04' },
	{ id: 6, kanji: '六', photo: 'p12' }
] as const satisfies readonly { id: number; kanji: string; photo: PhotoKey }[];

const wayFacts = [
	{ href: '#evening', hours: 0, photo: 'p08' },
	{ href: '#saturday', hours: 1, photo: 'p10' }
] as const satisfies readonly { href: string; hours: number; photo: PhotoKey }[];

const stripFacts = [
	{ photo: 'p03', wide: true },
	{ photo: 'p09', wide: false },
	{ photo: 'p07', wide: true },
	{ photo: 'p12', wide: false },
	{ photo: 'p04', wide: true },
	{ photo: 'p02', wide: false },
	{ photo: 'p11', wide: true }
] as const satisfies readonly { photo: PhotoKey; wide: boolean }[];

const navFacts = ['#story', '#evening', '#saturday', '#visit'] as const;

/** One entry of words for each fact, in the same order: the tuple types keep the counts equal. */
type WordsFor<T extends readonly unknown[], W> = { [K in keyof T]: W };

/** The words for the "open today" line, see `opening.ts`. */
export type OpeningWords = {
	/** Sunday first, as Date.getDay() counts */
	dayNames: [string, string, string, string, string, string, string];
	today: string;
	closedForToday: string;
	closedToday: string;
	from: string;
	closed: string;
	/** before the clock starts (prerendered HTML) */
	fallback: string;
};

/** Everything in one language. Each locale file is checked against this type. */
export type Copy = {
	lang: Locale;
	tagline: string;
	description: string;
	area: string;
	phoneHours: string;
	hours: WordsFor<typeof hours, { label: string; note: string }>;
	closedLabel: string;
	opening: OpeningWords;
	navLinks: WordsFor<typeof navFacts, string>;
	courses: WordsFor<typeof courseFacts, { title: string; line: string }>;
	ways: WordsFor<typeof wayFacts, { title: string; line: string; detail: string; alt: string }>;
	evening: { priceNote: string; note: string };
	saturdayFacts: { term: string; detail: string }[];
	goodToKnow: string[];
	strip: WordsFor<typeof stripFacts, string>;
	ui: {
		nav: { label: string; reserve: string; menu: string; close: string; language: string };
		hero: {
			lines: string[];
			lede: string;
			reserve: string;
			more: string;
			cue: string;
			cueLabel: string;
		};
		fortune: {
			vertical: string;
			eyebrow: string;
			lines: string[];
			lede: string;
			alt: string;
			caption: string;
		};
		ways: { eyebrow: string; lines: string[] };
		evening: {
			eyebrow: string;
			lines: string[];
			sample: string;
			course: string;
			reserve: string;
		};
		saturday: { eyebrow: string; lines: string[]; lede: string; video: string; reserve: string };
		strip: { label: string };
		visit: {
			eyebrow: string;
			lines: string[];
			hours: string;
			today: string;
			closed: string;
			find: string;
			good: string;
			reserve: string;
			waitlist: string;
		};
		footer: { reserve: string; top: string; credit: string };
	};
};

export type UI = Copy['ui'];

export type Course = {
	id: number;
	kanji: string;
	title: string;
	line: string;
	photo: PhotoKey;
};

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

export type StripPhoto = { photo: PhotoKey; alt: string; wide: boolean };

export type NavLink = { href: string; label: string };

function compose(copy: Copy) {
	const blocks: OpeningBlock[] = openingHours.map((block, i) => ({ ...block, ...copy.hours[i] }));
	const span = (block: Hours) => `${block.opens} – ${block.closes}`;

	const restaurant = {
		...facts,
		tagline: copy.tagline,
		description: copy.description,
		phone: { ...facts.phone, hours: copy.phoneHours },
		address: { ...facts.address, area: copy.area },
		hours: blocks,
		closedLabel: copy.closedLabel
	};

	return {
		locale: copy.lang,
		restaurant,
		opening: copy.opening,
		ui: copy.ui,
		navLinks: navFacts.map((href, i): NavLink => ({ href, label: copy.navLinks[i] })),
		courses: courseFacts.map((course, i): Course => ({ ...course, ...copy.courses[i] })),
		ways: wayFacts.map((way, i): Way => ({
			href: way.href,
			photo: way.photo,
			days: blocks[way.hours].label,
			hours: span(blocks[way.hours]),
			...copy.ways[i]
		})),
		evening: { price: facts.price, ...copy.evening },
		saturdayFacts: copy.saturdayFacts,
		goodToKnow: copy.goodToKnow,
		strip: stripFacts.map((item, i): StripPhoto => ({ ...item, alt: copy.strip[i] }))
	};
}

export type Content = ReturnType<typeof compose>;
export type Restaurant = Content['restaurant'];

export const content: Record<Locale, Content> = { en: compose(en), nl: compose(nl) };
