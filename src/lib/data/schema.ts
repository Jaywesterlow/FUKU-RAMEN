import type { Restaurant } from './restaurant';

/** schema.org Restaurant, generated from the same object the page renders. */
export function restaurantSchema(restaurant: Restaurant) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
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
		acceptsReservations: restaurant.reservations.url,
		sameAs: [restaurant.instagram],
		openingHoursSpecification: restaurant.hours.map((block) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: block.schemaDays,
			opens: block.opens,
			closes: block.closes
		}))
	};
}
