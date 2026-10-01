<script lang="ts">
	import 'lenis/dist/lenis.css';
	import '../app.css';

	import { prefersReducedMotion } from 'svelte/motion';
	import { Footer, Nav } from '$lib';
	import favicon from '$lib/assets/favicon.svg';
	import { restaurantSchema } from '$lib/data/schema';
	import { refreshWhenSettled, startSmoothScroll } from '$lib/motion/scroll';
	import { opening } from '$lib/state/opening.svelte';
	import { reservations } from '$lib/state/reservations.svelte';

	let { data, children } = $props();

	// closing tag split in two: a literal one would end this script block
	const schemaTag = $derived(
		'<script type="application/ld+json">' +
			JSON.stringify(restaurantSchema(data.restaurant)) +
			'</' +
			'script>'
	);

	// the clock behind "open today": starts in the browser, stops when the layout goes
	$effect(() => opening.start());

	// smooth scroll only for visitors who did not ask for less motion; flips live with the setting
	$effect(() => {
		if (prefersReducedMotion.current) return;
		return startSmoothScroll();
	});

	$effect(() => refreshWhenSettled());
</script>

<svelte:window onmessage={reservations.receive} onkeydown={reservations.key} />

<svelte:head>
	<title>{data.restaurant.name} · {data.restaurant.tagline}</title>
	<meta name="description" content={data.restaurant.description} />
	<link rel="icon" href={favicon} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own data, serialised as JSON -->
	{@html schemaTag}
	<!-- Tebi's own snippet, as on Fuku's site, rendered only after the first Reserve click -->
	{#if reservations.requested}
		<script
			src={data.restaurant.reservations.script}
			id="tebi"
			data-widget-token={data.restaurant.reservations.widgetToken}
			onerror={reservations.fail}
		></script>
	{/if}
</svelte:head>

<Nav restaurant={data.restaurant} links={data.navLinks} />

<main>
	{@render children()}
</main>

<Footer restaurant={data.restaurant} />
