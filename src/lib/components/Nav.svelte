<script lang="ts">
	import { reservations } from '$lib/state/reservations.svelte';
	import { fade } from 'svelte/transition';
	import { innerHeight, scrollY } from 'svelte/reactivity/window';
	import type { Locale, NavLink, Restaurant, UI } from '$lib/data/restaurant';
	import Button from './Button.svelte';
	import LangSwitch from './LangSwitch.svelte';

	type Props = { restaurant: Restaurant; links: NavLink[]; text: UI['nav']; locale: Locale };
	let { restaurant, links, text, locale }: Props = $props();

	let menuOpen = $state(false);

	/** past the hero (one screen high) the bar turns from white-on-photo to ink-on-paper */
	const pastHero = $derived((scrollY.current ?? 0) > (innerHeight.current ?? Infinity) - 72);
</script>

<nav
	class={['nav', { solid: pastHero && !menuOpen, 'over-menu': menuOpen }]}
	aria-label={text.label}
>
	<a class="brand tap" href="#top" onclick={() => (menuOpen = false)}>
		<span class="jp" aria-hidden="true">福</span>
		<span>{restaurant.name}</span>
	</a>

	<div class="links">
		{#each links as link (link.href)}
			<a class="ul tap" href={link.href}>{link.label}</a>
		{/each}
	</div>

	<div class="right">
		<LangSwitch {locale} label={text.language} />
		<div class="reserve">
			<Button
				href={restaurant.reservations.url}
				onclick={reservations.open}
				variant={pastHero ? 'outline' : 'light'}
				size="sm"
				arrow={false}
			>
				{text.reserve}
			</Button>
		</div>
		<button
			class="burger tap"
			aria-expanded={menuOpen}
			aria-controls="menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? text.close : text.menu}
		</button>
	</div>
</nav>

{#if menuOpen}
	<div class="menu" id="menu" transition:fade={{ duration: 300 }}>
		{#each links as link (link.href)}
			<a class="tap" href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
		{/each}
		<p class="small">{restaurant.address.street}, {restaurant.address.area}</p>
	</div>
{/if}

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: calc(var(--space-4) + env(safe-area-inset-top, 0px)) var(--gutter) var(--space-4);
		color: #fff;
		transition:
			color 0.35s,
			background 0.35s,
			box-shadow 0.35s;
	}
	.solid {
		color: var(--ink);
		background: color-mix(in srgb, var(--paper) 90%, transparent);
		backdrop-filter: blur(12px);
		box-shadow: 0 1px 0 var(--line);
	}
	.over-menu {
		color: var(--ink);
	}
	.brand {
		gap: var(--space-2);
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
	}
	.brand .jp {
		font-size: 1.45rem;
		line-height: 1;
	}
	.links {
		display: flex;
		gap: var(--space-6);
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
	}
	.right {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}
	/* the button is --tap high; the bar keeps its height */
	.reserve {
		margin-block: calc((var(--tap) - 2rem) / -2);
	}
	.burger {
		display: none;
		background: none;
		border: 0;
		color: inherit;
		font: var(--label-weight) var(--text-label) / 1 var(--font-body);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
		padding: 0;
		/* --tap high, but the bar keeps its old 26px row so the sticky photo below still fits */
		margin-block: calc((1.625rem - var(--tap)) / 2);
		cursor: pointer;
	}
	.menu {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: var(--paper);
		color: var(--ink);
		display: grid;
		place-content: center;
		text-align: center;
		gap: var(--space-5);
	}
	.menu a {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 2.4rem;
		line-height: 1.1;
	}
	.menu .small {
		margin-top: var(--space-5);
	}
	@media (max-width: 840px) {
		.links,
		.reserve {
			display: none;
		}
		.burger {
			display: inline-flex;
		}
	}
</style>
