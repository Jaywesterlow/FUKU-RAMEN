<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '$lib/assets/logo.png?enhanced';
	import { site, type Locale, type Restaurant, type UI } from '$lib/data/restaurant';

	type Props = { restaurant: Restaurant; text: UI['footer']; locale: Locale };
	let { restaurant, text, locale }: Props = $props();

	/** the other language, by its own name; a full page load, as in the nav */
	const other = $derived<Locale>(locale === 'en' ? 'nl' : 'en');
	const otherHref = $derived(
		resolve('/[[lang=locale]]', { lang: other === 'en' ? undefined : other })
	);
</script>

<footer>
	<div class="wrap">
		<div class="logo">
			<enhanced:img src={logo} alt={restaurant.name} sizes="72px" loading="lazy" />
		</div>

		<div>
			<p class="tag">{restaurant.tagline}</p>
			<address>
				{restaurant.address.street} · {restaurant.address.postalCode}
				{restaurant.address.city} ·
				<a class="ul" href="mailto:{restaurant.email}">{restaurant.email}</a>
			</address>
		</div>

		<div class="links">
			<a class="ul" href={restaurant.instagram} target="_blank" rel="noopener">Instagram</a>
			<a class="ul" href="#visit">{text.reserve}</a>
			<a class="ul" href="#top">{text.top}</a>
			<a class="ul" href={otherHref} hreflang={other} lang={other} data-sveltekit-reload>
				{site.languages[other].name}
			</a>
		</div>

		<p class="credit">
			<span>福 · {restaurant.name} · KVK {restaurant.kvk}</span>
			<span>{text.credit}</span>
		</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--line);
		padding-block: clamp(40px, 5vw, 64px) calc(28px + env(safe-area-inset-bottom, 0px));
	}
	.wrap {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1.5rem 3rem;
		align-items: center;
	}
	.logo :global(img) {
		height: 72px;
		width: auto;
		mix-blend-mode: multiply;
	}
	.tag {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.5rem;
		line-height: 1.1;
		margin-bottom: 0.4rem;
	}
	address {
		font-style: normal;
		font-size: 0.88rem;
		color: var(--ink-2);
		line-height: 1.6;
	}
	.links {
		display: grid;
		gap: 0.45rem;
		justify-items: end;
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.credit {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		border-top: 1px solid var(--line);
		padding-top: 1rem;
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-2);
	}
	@media (max-width: 700px) {
		.wrap {
			grid-template-columns: 1fr;
		}
		.links {
			justify-items: start;
		}
	}
</style>
