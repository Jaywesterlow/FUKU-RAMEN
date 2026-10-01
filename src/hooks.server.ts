import type { Handle } from '@sveltejs/kit';
import { localeFrom } from '$lib/data/restaurant';

// `<html lang>` per page: app.html carries a placeholder; this runs at prerender time too.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', localeFrom(event.params.lang))
	});
