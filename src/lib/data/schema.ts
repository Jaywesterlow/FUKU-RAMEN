import { site, type Locale, type Restaurant } from './restaurant';

type Page = { locale: Locale; url: string; title: string; description: string };

/**
 * schema.org Restaurant, generated from the same object the page renders, plus the WebPage
 * that carries the page's language. The Restaurant's facts are the same on every language;
 * `inLanguage` sits on the WebPage because schema.org defines it there, not on a Restaurant.
 */
export function restaurantSchema(restaurant: Restaurant, page: Page) {
	const id = `${site.origin}/#restaurant`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Restaurant',
				'@id': id,
				name: restaurant.name,
				url: restaurant.url,
				telephone: restaurant.phone.schema,
				email: restaurant.email,
				servesCuisine: restaurant.cuisine,
				priceRange: restaurant.priceRange,
				address: {
					'@type': 'PostalAddress',
					streetAddress: restaurant.address.street,
					postalCode: restaurant.address.postalCode,
					addressLocality: restaurant.address.city,
					addressCountry: restaurant.address.country
				},
				acceptsReservations: restaurant.reserveUrl,
				sameAs: [restaurant.instagram],
				openingHoursSpecification: restaurant.hours.map((block) => ({
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: block.schemaDays,
					opens: block.opens,
					closes: block.closes
				}))
			},
			{
				'@type': 'WebPage',
				'@id': page.url,
				url: page.url,
				name: page.title,
				description: page.description,
				inLanguage: page.locale,
				about: { '@id': id }
			}
		]
	};
}
