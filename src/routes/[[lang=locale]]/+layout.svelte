<script lang="ts">
	import 'lenis/dist/lenis.css';
	import '../../app.css';

	import { prefersReducedMotion } from 'svelte/motion';
	import { Footer, Nav, ReserveDialog } from '$lib';
	import favicon from '$lib/assets/favicon.svg';
	import { locales, site } from '$lib/data/restaurant';
	import { restaurantSchema } from '$lib/data/schema';
	import { refreshWhenSettled, startSmoothScroll } from '$lib/motion/scroll';
	import { opening } from '$lib/state/opening.svelte';

	let { data, children } = $props();

	const absolute = (path: string) => site.origin + path;

	const title = $derived(`${data.restaurant.name} · ${data.restaurant.tagline}`);
	const canonical = $derived(absolute(site.paths[data.locale]));

	// closing tag split in two: a literal one would end this script block
	const schemaTag = $derived(
		'<script type="application/ld+json">' +
			JSON.stringify(
				restaurantSchema(data.restaurant, {
					locale: data.locale,
					url: canonical,
					title,
					description: data.restaurant.description
				})
			) +
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

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={data.restaurant.description} />
	<link rel="canonical" href={canonical} />
	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={absolute(site.paths[locale])} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={absolute(site.paths.en)} />
	<link rel="icon" href={favicon} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own data, serialised as JSON -->
	{@html schemaTag}
</svelte:head>

<Nav restaurant={data.restaurant} links={data.navLinks} text={data.ui.nav} locale={data.locale} />

<main>
	{@render children()}
</main>

<Footer restaurant={data.restaurant} text={data.ui.footer} locale={data.locale} />

<ReserveDialog text={data.ui.demo} href={data.restaurant.reservations.url} />
