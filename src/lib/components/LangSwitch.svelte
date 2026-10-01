<script lang="ts">
	import { resolve } from '$app/paths';
	import { locales, site, type Locale } from '$lib/data/restaurant';

	/** EN / NL. A full page load on purpose: `<html lang>` and the reveals start clean. */
	type Props = { locale: Locale; label: string };
	let { locale, label }: Props = $props();

	const href = (to: Locale) => resolve('/[[lang=locale]]', { lang: to === 'en' ? undefined : to });
</script>

<div class="lang" role="group" aria-label={label}>
	{#each locales as to (to)}
		<a
			href={href(to)}
			hreflang={to}
			lang={to}
			title={site.languages[to].name}
			aria-current={to === locale ? 'page' : undefined}
			data-sveltekit-reload
		>
			{site.languages[to].code}
		</a>
	{/each}
</div>

<style>
	.lang {
		display: flex;
		gap: 0.7em;
		font-size: 0.74rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	a {
		padding-block: 0.3em;
		opacity: 0.5;
		transition: opacity 0.35s;
	}
	a:hover,
	a[aria-current='page'] {
		opacity: 1;
	}
</style>
