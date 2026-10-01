import type { Copy } from './restaurant';

/**
 * Dutch, at `/nl`. Same meaning as the English, no new claims. Dish names and Japanese terms
 * stay as they are; "Ramen redefined." is Fuku's own tagline and stays in English.
 */
export const nl: Copy = {
	lang: 'nl',
	tagline: 'Ramen redefined.',
	description:
		'Ramen redefined. Een seizoensproefmenu rond huisgemaakte ramen, lokale ingrediënten en sake in Amsterdam-Oost. Op zaterdag izakaya à la carte.',
	area: 'Amsterdam-Oost',
	phoneHours: 'Telefonisch woensdag t/m zaterdag, 11:00 – 18:00',
	hours: [
		{ label: 'Woensdag t/m vrijdag', note: 'de avond, alleen op reservering' },
		{ label: 'Zaterdag', note: 'izakaya, beperkt zonder reservering' }
	],
	closedLabel: 'Zondag t/m dinsdag',
	opening: {
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		today: 'Vandaag',
		closedForToday: 'Vandaag niet meer open',
		closedToday: 'Vandaag gesloten',
		from: 'vanaf',
		closed: 'Gesloten',
		fallback: 'Woensdag t/m zaterdag'
	},
	navLinks: ['Geluk', 'De avond', 'Zaterdag', 'Bezoek'],
	courses: [
		{ title: 'Om te beginnen', line: 'Kleine hapjes en een eerste glas.' },
		{ title: 'Rauw', line: 'Vis en groente, precies op hun moment.' },
		{ title: 'Van de houtskool', line: 'Zo van het vuur naar de counter.' },
		{ title: 'Het bord van het seizoen', line: 'Wat deze maand op z’n best is.' },
		{ title: 'De kom', line: 'Huisgemaakte ramen, als hoofdgerecht.' },
		{ title: 'Tot slot', line: 'Iets zoets, en een laatste sake.' }
	],
	ways: [
		{
			title: 'De avond',
			line: 'Zes gangen, met ramen als hoofdgerecht.',
			detail: '€89 · alleen op reservering',
			alt: 'Een gang op een stenen bord'
		},
		{
			title: 'De izakaya',
			line: 'À la carte, elke week een ramenspecial.',
			detail: 'Beperkt zonder reservering',
			alt: 'Spiesjes boven de houtskoolgrill'
		}
	],
	evening: {
		priceNote: 'per persoon · alleen op reservering',
		note: 'Een voorbeeldopbouw. Het menu volgt het seizoen.'
	},
	saturdayFacts: [
		{ term: 'Reserveren', detail: 'Aanbevolen. Beperkt plek zonder reservering.' },
		{ term: 'Gezelschap', detail: 'Kinderen en honden welkom.' },
		{ term: 'Vega & vegan', detail: 'Op zaterdag altijd mogelijk.' }
	],
	goodToKnow: [
		'Reserveren kan vanaf de 1e van elke maand om 12:00, twee maanden vooruit.',
		'Een aanbetaling van €10 per persoon houdt je tafel vast. Kosteloos wijzigen tot 24 uur vooraf.',
		'Online voor maximaal 5 gasten. Grotere groepen per e-mail.',
		'De avond is voor gasten vanaf 13 jaar. Laat parfum liever thuis.',
		'Pescotarisch en zonder varkensvlees kan. Vegetarisch en vegan op zaterdag.'
	],
	strip: [
		'De counter en de bar, zacht verlicht',
		'Een fles sake',
		'Een tafel aan de muur met één bloem',
		'Een cocktail met sinaasappelschil',
		'Noedels uit een kom getild',
		'Shoyu-ramen met ei en chashu',
		'Gegrilde vis op een groene saus'
	],
	ui: {
		nav: {
			label: 'Hoofdmenu',
			reserve: 'Reserveer',
			menu: 'Menu',
			close: 'Sluit',
			language: 'Taal'
		},
		hero: {
			lines: ['Ramen', 'redefined.'],
			lede: 'Zes seizoensgangen die uitlopen op een kom ramen.',
			reserve: 'Reserveer een tafel',
			more: 'De avond',
			cue: 'Scroll',
			cueLabel: 'Scroll omlaag'
		},
		fortune: {
			vertical: 'fuku · geluk',
			eyebrow: 'Geluk',
			lines: ['Fuku betekent geluk.', 'Hier komt het in een kom.'],
			lede: 'Huisgemaakte ramen, lokale ingrediënten, sake. Doordeweeks een seizoensproefmenu, op zaterdag de izakaya.',
			alt: 'De chef aan de counter, bezig met een gang',
			caption: 'De counter'
		},
		ways: { eyebrow: 'Twee manieren om hier te eten', lines: ['Een avond, of een zaterdag.'] },
		evening: {
			eyebrow: 'De avond · woensdag t/m vrijdag',
			lines: ['Zes gangen.', 'Eén kom aan het eind.'],
			sample: 'Voorbeeldavond',
			course: 'Gang',
			reserve: 'Reserveer de avond'
		},
		saturday: {
			eyebrow: 'Zaterdag · 13:00 – 19:30',
			lines: ['De izakaya.'],
			lede: 'À la carte vanaf één uur ’s middags. Een ramenspecial die elke week wisselt, gerechten om te delen, sake.',
			video: 'Noedels die uit een kom ramen worden getild',
			reserve: 'Reserveer een zaterdag'
		},
		strip: { label: 'Foto’s van Fuku Ramen' },
		visit: {
			eyebrow: 'Langskomen & reserveren',
			lines: ['Kom eten.'],
			hours: 'Openingstijden',
			today: 'Vandaag',
			closed: 'Gesloten',
			find: 'Zo vind je ons',
			good: 'Goed om te weten',
			reserve: 'Reserveer een tafel',
			waitlist:
				'Volgeboekt? Via de wachtlijst in het reserveringssysteem krijg je een mail zodra er een tafel vrijkomt.'
		},
		footer: { reserve: 'Reserveer', top: 'Terug naar boven', credit: 'Conceptdemo · jwcreative.nl' }
	}
};
